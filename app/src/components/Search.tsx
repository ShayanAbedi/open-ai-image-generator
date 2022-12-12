import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Spin,
} from 'antd';
import axios from 'axios';

const Search = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [images, setImages] = useState<[{ url: string }] | null>(null);
  const [loading, setLoading] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState<any>(1);

  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post('http://localhost:9000/openai/generateimage', {
        prompt: values.prompt,
        size: 'medium',
        n: numberOfImages,
      })
      .then((res) => {
        setLoading(false);
        setImages(res.data.data);
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: err.response.data.error,
        });
        setLoading(false);
        setImages(null);
      });
  };

  return (
    <Modal
      open={true}
      width={2000}
      title={
        <div style={{ textAlign: 'center', fontSize: '32px' }}>
          Text to Image
        </div>
      }
      footer={false}
      closable={false}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        initialValues={{ prompt: '' }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item label="Number of Images (Max: 10)" name="numberOfImages">
          {' '}
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={(value) => setNumberOfImages(value)}
          />
        </Form.Item>

        <Form.Item label="Search" name="prompt" required>
          <Input
            placeholder="A 3D render of an astronaut walking in a green desert"
            required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Generate Image
          </Button>
        </Form.Item>
      </Form>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '120px' }}>
          <Spin size="large" />
        </div>
      ) : (
        images && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '20px',
              maxHeight: '500px',
              overflow: 'scroll',
            }}
          >
            {images.map((img) => {
              return (
                <Image
                  width={400}
                  src={img.url}
                  style={{
                    padding: '0px',
                    borderRadius: '50%',
                  }}
                />
              );
            })}
          </div>
        )
      )}
    </Modal>
  );
};

export default Search;
