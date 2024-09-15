import { message } from 'antd';
import { createEffect } from 'effector';

export const showErrorMessageFx = createEffect((err: Error) => message.error(err.message));

export const showSuccessMessageFx = createEffect((text: string) => message.success(text));
