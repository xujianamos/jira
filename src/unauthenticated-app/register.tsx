import { Button, Form, Input } from "antd";
import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { LongButton } from "./index";
import { useAsync } from "../hooks/useAsync";
const apiUrl = process.env.REACT_APP_API_URL;
export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register, user } = useAuth();
  const { isLoading, run } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({ cpassword, ...values }: { username: string; password: string; cpassword: string }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    try {
      // register(values).catch(onError);
      await run(register(values));
    } catch (e) {
      // @ts-ignore
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit} labelAlign="right">
      <Form.Item label={""} name={"username"} rules={[{ required: true, message: "请输入用户名" }]}>
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item label={""} name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item label={""} name={"cpassword"} rules={[{ required: true, message: "请确认密码" }]}>
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
