import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  Header,
  InputText,
  TableData,
  TableRow,
  TableSecondary,
} from '@pentabd/ui';
import {
  IconPlus,
  // IconTrash03
} from '@pentabd/icons';

import { useGetMessageList } from '@hooks/election-schedule-management/main-list/message-list/useGetMessageList';
import { useCreateMessages } from '@hooks/election-schedule-management/main-list/message-list/useCreateMessages';

import { messageListDefaultValue } from './defaultValue';
import { messageListTableBreadcrumbs } from './constants';
import { messageListTableColumns } from './message-list-table-data';
import IconDotsSix from '@images/icons/IconDotsSix';
import {
  MESSAGE_LIST,
  MessageListValidationType,
  messageListValidation,
} from '@validations/election-declaration-management/main-list/message-list/messageListValidation';
import { MessageListType } from '@type/election-declaration-management/main-list/message-list/message-list-type';

export default function MessageList() {
  const { t } = useTranslation();
  const { messages, getMessageList } = useGetMessageList();
  const { createMessages, loading } = useCreateMessages();

  const methods = useForm<MessageListValidationType>({
    resolver: yupResolver(messageListValidation),
    values: {
      messageList: messages,
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const {
    fields: messageListValidationFields,
    append: messageListValidationAppend,
    // remove: messageListValidationRemove,
  } = useFieldArray({
    control,
    name: 'messageList',
  });

  const onSubmit: SubmitHandler<MessageListValidationType> = (data: any) => {
    const mappedData: MessageListType[] = [];
    data?.messageList.forEach((item: MessageListType) => {
      if (item.id) {
        mappedData.push({
          id: item.id,
          nameBn: item.nameBn,
          nameEn: item.nameEn,
        });
      } else if (!item.id) {
        mappedData.push({
          nameBn: item.nameBn,
          nameEn: item.nameEn,
        });
      }
    });
    createMessages(mappedData);
  };

  useEffect(() => {
    getMessageList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-96 mb-24">
      <FormProvider {...methods}>
        <form className="container my-10" onSubmit={handleSubmit(onSubmit)}>
          <Header
            className="mb-10 pt-10"
            headerText={{ header: t('MESSAGE_LIST.MESSAGE_LIST_TITLE') }}
            breadcrumbs={messageListTableBreadcrumbs(t)}
          />

          <TableSecondary columns={messageListTableColumns(t)}>
            {messageListValidationFields.map((_, index) => {
              return (
                <TableRow key={index}>
                  <TableData>
                    <IconDotsSix />
                  </TableData>
                  <TableData>
                    <InputText
                      {...register(
                        `messageList.${index}.${MESSAGE_LIST.EVENT_BN}`,
                      )}
                      placeholder={t('PLACEHOLDER.ENTER')}
                      minWidth
                      controlling
                      error={errors as any}
                      getTranslation={t}
                    />
                  </TableData>

                  <TableData>
                    <InputText
                      {...register(
                        `messageList.${index}.${MESSAGE_LIST.EVENT_EN}`,
                      )}
                      placeholder={t('PLACEHOLDER.ENTER')}
                      minWidth
                      error={errors as any}
                      getTranslation={t}
                    />
                  </TableData>

                  {/* <TableData>
                      <div
                        className="pointer"
                        onClick={() => {
                          messageListValidationRemove(index);
                        }}
                      >
                        <IconTrash03 size="20" fill="dark" />
                      </div>
                    </TableData> */}
                </TableRow>
              );
            })}
          </TableSecondary>

          <div className="py-10 rounded-4 bg-white">
            <Button
              fill="outline"
              type="light"
              htmlType="button"
              onClick={() =>
                messageListValidationAppend({
                  ...messageListDefaultValue,
                  id: '',
                })
              }
            >
              <IconPlus size="16" fill="dark" />
              {t('MESSAGE_LIST.MESSAGE_LIST_ADD_NEW_BUTTON_TEXT')}
            </Button>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-6 border-top pt-8">
            {/* <Button
              fill="outline"
              key={1}
              htmlType="button"
              type="light"
              onClick={() => {}}
            >
              {t('MESSAGE_LIST.MESSAGE_LIST_CANCEL_BUTTON_TEXT')}
            </Button> */}
            <Button key={2} htmlType="submit" type="info" loading={loading}>
              {t('MESSAGE_LIST.MESSAGE_LIST_UPDATE_BUTTON_TEXT')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
