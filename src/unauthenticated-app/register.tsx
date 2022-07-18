import { Button, Form, Input } from "antd";
import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit} labelAlign="right">
      <Form.Item label={""} name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item label={""} name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
