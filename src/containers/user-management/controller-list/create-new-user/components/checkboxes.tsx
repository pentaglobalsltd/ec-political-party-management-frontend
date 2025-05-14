import { useEffect, useState } from 'react';
import { Button, Tag, Text } from '@pentabd/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '@hookform/error-message';
import { SelectOptionArray } from '@type/selection-option-type';
import AnimateHeight from 'react-animate-height';
import { IconChevronDown } from '@pentabd/icons';

export interface AroCheckboxProps {
  name: string;
  title: string;
  data?: SelectOptionArray[];
  success: boolean;
  noDataMessage?: string;
  addAllOnMount?: boolean;
  selectAll?: boolean;
  removeAll?: boolean;
  disabled?: boolean;
}
export const Checkboxes = ({
  title,
  name,
  data,
  success,
  noDataMessage,
  addAllOnMount,
  selectAll,
  removeAll,
  disabled,
}: AroCheckboxProps) => {
  const { t } = useTranslation();
  const [height, setHeight] = useState<any>('auto');
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const dataWatch = watch(name);

  useEffect(() => {
    if (addAllOnMount) {
      handleAddAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addAllOnMount]);

  const handleAddAll = () => {
    const addAllData = data?.map((item: any) => item?.value);

    setValue(name, addAllData);
  };

  const handleRemoveAll = () => {
    setValue(name, []);
  };

  const mappedData = success
    ? dataWatch?.filter((value: number) =>
        data?.find((item) => item?.value === value),
      )
    : dataWatch;

  useEffect(() => {
    setValue(name, mappedData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedData?.length]);

  return (
    <div>
      {success ? (
        <div className="d-grid grid-cols-12 mb-12">
          <div className="col-span-12 col-span-lg-3">
            <Text weight="semibold" size="sm" color="title" className="p">
              {title}
            </Text>
          </div>
          <div className="col-span-12 col-span-lg-6 ">
            {data && data?.length > 0 ? (
              <div className="col-span-12 col-span-lg-6 bg-extra-light border rounded p-8">
                <div className="position-relative pt-5">
                  <div className="d-flex flex-wrap align-items-center gap-4 w-100  overflow-x-auto pt-7">
                    {height === 0
                      ? data
                          ?.filter((item: SelectOptionArray) =>
                            dataWatch?.includes(item?.value),
                          )
                          ?.map((item: SelectOptionArray) => {
                            return (
                              <Tag
                                label={item?.label}
                                size="sm"
                                className="text-nowrap"
                              />
                            );
                          })
                      : null}
                  </div>
                  <div
                    className="position-absolute right-0 top-0 pointer"
                    onClick={() => setHeight(height === 0 ? 'auto' : 0)}
                  >
                    <IconChevronDown size="20" fill="subtitle2" />
                  </div>
                </div>
                <AnimateHeight
                  id="example-panel"
                  duration={500}
                  height={height}
                >
                  {selectAll || removeAll ? (
                    <div className="d-flex justify-content-between ">
                      {selectAll ? (
                        <Button
                          size="xs"
                          fill="outline"
                          type="primary"
                          onClick={() => handleAddAll()}
                          disabled={disabled}
                        >
                          <Text>{t('ELECTION_SETTINGS.ADD_ALL')}</Text>
                        </Button>
                      ) : null}
                      {removeAll ? (
                        <Button
                          type="danger"
                          size="xs"
                          fill="outline"
                          onClick={() => handleRemoveAll()}
                          disabled={disabled}
                        >
                          <Text>{t('ELECTION_SETTINGS.REMOVE_ALL')}</Text>
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                  <div>
                    {data?.map((item: SelectOptionArray, index: number) => (
                      <Controller
                        key={index}
                        name={name}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                          <div className="py-3 d-flex gap-5">
                            <input
                              id={`${item?.value}`}
                              key={item?.value}
                              type="checkbox"
                              checked={field.value?.includes(item?.value)}
                              onChange={(e) => {
                                const isChecked: any = e.target.checked;
                                const updatedValues = isChecked
                                  ? [...field.value, item?.value]
                                  : field.value.filter(
                                      (val: any) => val !== item?.value,
                                    );
                                field.onChange(updatedValues);
                              }}
                              value={item?.value}
                              disabled={disabled}
                            />
                            <label htmlFor={`${item?.value}`}>
                              {item?.label}
                            </label>
                          </div>
                        )}
                      />
                    ))}
                  </div>
                </AnimateHeight>
              </div>
            ) : (
              <div className="col-span-12 col-span-lg-6">{noDataMessage}</div>
            )}
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <div className="pt-5">
                  <Text color="danger">{t(message)}</Text>
                </div>
              )}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
