import { Flex, Form, FormProps, Input, Select, Typography } from 'antd';
import { useStoreMap, useUnit } from 'effector-react';
import { type JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { $user, createUserFx, getUserFx, updateUserFx } from '@/stores/user-store';
import { $userTypes } from '@/stores/users-store';
import { CreateUser } from '@/types/user';

import { FormSubmitButton } from '../buttons/form-submit-button';

export function UserForm(): JSX.Element {
  const { id } = useParams();
  const userId = Number(id);
  const [user, loadingUser, userTypes] = useUnit([$user, getUserFx.pending, $userTypes]);
  const [form] = Form.useForm();

  useEffect(() => {
    getUserFx(userId);
    return () => {
      getUserFx();
    };
  }, [userId]);

  const userTypesOptions = useStoreMap({
    store: $userTypes,
    keys: [],
    fn: (userTypes) =>
      userTypes.map((userType) => ({
        label: userType.name,
        value: userType.id,
        display: userType.name,
      })),
  });

  const onFinish: FormProps<CreateUser>['onFinish'] = async (values) => {
    const selectedUserType = userTypes.find((userType) => userType.id === values.type_id);
    const newValues = { ...values, type: selectedUserType?.name };
    if (user) {
      await updateUserFx({ ...newValues, id: userId });
    } else {
      await createUserFx(newValues);
    }
  };

  return (
    <>
      {!loadingUser && (
        <Form
          form={form}
          style={{
            padding: 20,
            maxWidth: 500,
            margin: '40px auto',
            borderRadius: 10,
            border: '1px solid #52618d',
          }}
          onFinish={onFinish}
          initialValues={user || undefined}
          layout="vertical"
        >
          <Typography.Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>
            {user ? 'Редактирование пользователя' : 'Создание пользователя'}
          </Typography.Title>
          <Form.Item
            label="Имя пользователя:"
            name="name"
            rules={[{ required: true, message: 'Заполните поле имени' }]}
          >
            <Input allowClear placeholder="Введите имя пользователя" />
          </Form.Item>
          <Form.Item
            label="Логин пользователя:"
            name="login"
            rules={[{ required: true, message: 'Заполните поле логина' }]}
          >
            <Input allowClear placeholder="Введите логин пользователя" />
          </Form.Item>
          <Form.Item
            label="Пароль пользователя:"
            name="password"
            rules={[{ required: true, message: 'Заполните поле пароля' }]}
          >
            <Input allowClear placeholder="Введите пароль пользователя" />
          </Form.Item>
          <Form.Item
            label="Тип пользователя:"
            name="type_id"
            rules={[{ required: true, message: 'Заполните поле типа' }]}
          >
            <Select
              allowClear
              showSearch
              placeholder="Выберите тип пользователя"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={userTypesOptions}
            />
          </Form.Item>
          <Flex justify="end">
            <FormSubmitButton form={form}>Отправить</FormSubmitButton>
          </Flex>
        </Form>
      )}
    </>
  );
}
