import { Button, DatePicker, Flex, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useStoreMap, useUnit } from 'effector-react';
import type { JSX } from 'react';

import { getFilteredUsersFx } from '@/stores/filters-store';
import { $userTypes } from '@/stores/users-store';

const { RangePicker } = DatePicker;

export function FiltersForm(): JSX.Element {
  const [filtersLoading] = useUnit([getFilteredUsersFx.pending]);

  const userTypes = useStoreMap({
    store: $userTypes,
    keys: [],
    fn: (userTypes) =>
      userTypes.map((userType) => ({
        label: userType.name,
        value: userType.name,
      })),
  });

  return (
    <Form
      style={{ padding: 20 }}
      onFinish={getFilteredUsersFx}
      initialValues={{ dateRange: [dayjs('2021-01-01'), dayjs()] }}
      layout="vertical"
    >
      <Form.Item label="Имя пользователя" name="name">
        <Input allowClear placeholder="Введите имя пользователя" />
      </Form.Item>
      <Form.Item label="Тип пользователя" name="type">
        <Select
          allowClear
          showSearch
          placeholder="Выберите тип пользователя"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={userTypes}
        />
      </Form.Item>
      <Form.Item
        label={
          <Flex gap={96}>
            <span>Дата с</span>
            <span>Дата по</span>
          </Flex>
        }
        name={'dateRange'}
      >
        <RangePicker
          allowClear={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>
      <Button type="primary" block loading={filtersLoading} htmlType="submit">
        Поиск
      </Button>
    </Form>
  );
}
