import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Button } from '@pentabd/ui';

import {
  IconChevronDown,
  IconChevronUp,
  IconMinusSquare,
  IconPlus,
} from '@pentabd/icons';
import { areObjectsEqual } from '@utils/objectOperation';
import classNames from 'classnames';

export const RecursiveComponent = ({
  item,
  handleClick,
  selected,
  bulkRemove,
  bulkAdd,
}: any) => {
  const { t } = useTranslation();

  const [showReset, setShowReset] = useState(false);
  const [open, setOpen] = useState(false);

  const itemIds: any = {};

  for (let key in item)
    if (key.endsWith('Id') && item[key]) itemIds[key] = item[key];

  useEffect(() => {
    const result = selected.find((item: any) =>
      Object.keys(itemIds).reduce(
        (prev: any, curr: any) => prev && item[curr] === itemIds[curr],
        true,
      ),
    );

    setShowReset(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div
      className={classNames(
        { 'w-100 border': item?.children },
        'rounded-4 d-flex align-items-center mb-8 flex-wrap',
      )}
    >
      {item?.children ? (
        <>
          <div className={classNames({ 'w-100': item?.children })}>
            <div
              className={classNames(
                'd-flex px-8 align-items-center py-6 flex-wrap',
                {
                  'border-bottom': open,
                  'w-100': item?.children,
                },
                'justify-content-between overflow-hidden',
              )}
            >
              <Text weight="medium" size="sm">
                {item?.nameBn}
              </Text>

              <div className="d-flex gap-10 align-items-center">
                <Button
                  type="info"
                  fill="outline"
                  size="sm"
                  onClick={() => bulkAdd(itemIds)}
                  className="p-0 px-6 py-3"
                >
                  <Text>{t('ELECTION_SETTINGS.ADD_ALL')}</Text>
                  <IconPlus size="20" fill="info" />
                </Button>

                {showReset ? (
                  <Button
                    type="info"
                    size="sm"
                    onClick={() => bulkRemove(itemIds)}
                    className="p-0 px-6 py-3"
                  >
                    <Text>{t('ELECTION_SETTINGS.REMOVE')}</Text>
                    <IconMinusSquare size="20" fill="white" />
                  </Button>
                ) : (
                  <></>
                )}

                {open ? (
                  <div
                    className="pointer"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <IconChevronUp size="20" fill="info" />
                  </div>
                ) : (
                  <div
                    className="pointer"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <IconChevronDown size="20" fill="fill-subtitle2" />
                  </div>
                )}
              </div>
            </div>
            {open ? (
              <>
                <div
                  className={classNames(' d-flex flex-wrap', {
                    'w-100 py-6 px-8': item.children,
                  })}
                >
                  {item.children?.map((item: any, index: number) => (
                    <RecursiveComponent
                      key={index}
                      item={item}
                      handleClick={handleClick}
                      selected={[...selected]}
                      bulkRemove={bulkRemove}
                      bulkAdd={bulkAdd}
                    />
                  ))}
                </div>{' '}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="p-2">
          {(selected &&
            selected.findIndex((selectedItem: any) =>
              areObjectsEqual(item, selectedItem),
            ) >= 0) ||
          item?.settingsId ? (
            <Button
              type="info"
              fill="fill"
              size="sm"
              onClick={() => handleClick(item)}
              className="p-0 px-6 py-3"
              disabled={item?.settingsId}
            >
              <Text>{item.nameBn}</Text>
              <IconMinusSquare size="20" fill="white" />
            </Button>
          ) : (
            <Button
              type="dark"
              fill="transparent"
              size="sm"
              onClick={() => handleClick(item)}
              className="p-0 px-6 py-3"
            >
              <Text>{item.nameBn}</Text>
              <IconPlus size="20" fill="info" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
