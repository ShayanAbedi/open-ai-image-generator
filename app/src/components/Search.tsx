import { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Spin } from 'antd';
import axios from 'axios';

const Search = () => {
  const [form] = Form.useForm();
  const [size, setSize] = useState('medium');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSizeChange = ({ sizeValue }: any) => {
    setSize(sizeValue);
  };
  const onFinish = (values: any) => {
    setLoading(true);
    axios
      .post('http://localhost:9000/openai/generateimage', {
        prompt: values.prompt,
        size: values.size,
        n: 1,
      })
      .then((res) => {
        setLoading(false);
        setImageUrl(res.data.data[0].url);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ sizeValue: size, prompt: '' }}
        onValuesChange={onSizeChange}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item label="Image Size" name="sizeValue">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="medium">Medium</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Search" name="prompt">
          <Input placeholder="Search" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {loading ? <Spin /> : imageUrl && <img src={imageUrl} />}
    </div>
  );
};

export default Search;
