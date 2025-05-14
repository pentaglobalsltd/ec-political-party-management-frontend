import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TableData, TableRow } from '@pentabd/ui';
import { INPUT_TYPE_TABLE_ROW } from '@validations/vote-center-management/center-management/vote-center-addition/voteCenterAdditionValidation';
import { VOTE_CENTER_MANAGEMENT } from '@constants/forms/vote-center-management/vote-center-management';
import { VoterCount } from '../types';
import VoterAreaInputNumber from '../components/VoterAreaInputNumber';

interface PropsInputTypeTableRow {
  voterArea?: string | number;
  areaCode?: string | number;
  index?: number;
  setVoterCount: (x: any) => void;
  rowData: any;
}

const {
  IS_CHECKED,
  NUMBER_OF_VOTERS,
  SERIAL_OF_VOTERS_MALE,
  SERIAL_OF_VOTERS_FEMALE,
  SERIAL_OF_VOTERS_THIRD_GENDER,
} =
  VOTE_CENTER_MANAGEMENT.CENTER_MANAGEMENT.VOTE_CENTER_ADDITION.NEW_CENTER
    .ADD_VOTER_AREA_TABLE;

const InputTypeTableRow = ({
  voterArea,
  areaCode,
  index,
  setVoterCount,
  rowData,
}: PropsInputTypeTableRow) => {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();

  const [rowChecked, setRowChecked] = useState(false);
  const [totalVoteRow, setTotalVoteRow] = useState(0);

  useEffect(() => {
    if (index !== undefined) {
      const isThisRowChecked = rowData?.[IS_CHECKED];

      if (isThisRowChecked) {
        setRowChecked(isThisRowChecked);
      }
    }
  }, [index, voterArea, setRowChecked, rowData]);

  useEffect(() => {
    if (rowChecked) {
      const maleVoter = parseInt(rowData?.maleVoter) | 0;
      const femaleVoter = parseInt(rowData?.femaleVoter) | 0;
      const thirdGenderVoter = parseInt(rowData?.thirdGenderVoter) | 0;

      const rowSum = maleVoter + femaleVoter + thirdGenderVoter;

      setTotalVoteRow(rowSum);
    }
  }, [rowChecked, rowData]);

  const handleCheckBoxSelect = (e: any) => {
    const { checked } = e.target;
    setRowChecked(checked);

    const row = getValues();

    if (index !== undefined) {
      const maleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_MALE],
        ) | 0;
      const femaleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_FEMALE],
        ) | 0;

      const thirdGenderVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[
            NUMBER_OF_VOTERS.COL_THIRD_GENDER
          ],
        ) | 0;

      const totalVoters = maleVoters + femaleVoters + thirdGenderVoters;

      if (checked) {
        setVoterCount((prev: VoterCount) => {
          return {
            male: prev.male + maleVoters,
            female: prev.female + femaleVoters,
            thirdGender: prev.thirdGender + thirdGenderVoters,
            total: prev.total + totalVoters,
          };
        });

        setTotalVoteRow(totalVoters);
      } else {
        setVoterCount((prev: VoterCount) => {
          return {
            male: prev.male - maleVoters,
            female: prev.female - femaleVoters,
            thirdGender: prev.thirdGender - thirdGenderVoters,
            total: prev.total - totalVoters,
          };
        });

        setTotalVoteRow(0);
      }
    }
  };

  const onChangeMaleVoter = (value: any) => {
    if (rowChecked && index !== undefined) {
      const row = getValues();

      const rowMaleVoters = parseInt(value) | 0;

      const rowFemaleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_FEMALE],
        ) | 0;

      const rowThirdGenderVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[
            NUMBER_OF_VOTERS.COL_THIRD_GENDER
          ],
        ) | 0;

      const rowTotalVoters =
        rowMaleVoters + rowFemaleVoters + rowThirdGenderVoters;

      setTotalVoteRow(rowTotalVoters);

      const voterAreaArray: any[] = watch(INPUT_TYPE_TABLE_ROW);

      let sum = rowMaleVoters;

      // eslint-disable-next-line array-callback-return
      voterAreaArray?.map((item, indexMap) => {
        if (indexMap !== index && item?.[IS_CHECKED]) {
          const value = parseInt(item?.[NUMBER_OF_VOTERS.COL_MALE]) | 0;
          sum = sum + value;
        }
      });

      setVoterCount((prev: VoterCount) => {
        return {
          ...prev,
          male: sum,
          total: Number(prev.female) + Number(prev.thirdGender) + sum,
        };
      });
    }
  };

  const onChangeFemaleVoter = (value: any) => {
    if (rowChecked && index !== undefined) {
      const row = getValues();

      const rowFemaleVoters = parseInt(value) | 0;

      const rowMaleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_MALE],
        ) | 0;

      const rowThirdGenderVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[
            NUMBER_OF_VOTERS.COL_THIRD_GENDER
          ],
        ) | 0;

      const rowTotalVoters =
        rowMaleVoters + rowFemaleVoters + rowThirdGenderVoters;

      setTotalVoteRow(rowTotalVoters);

      const voterAreaArray: any[] = watch(INPUT_TYPE_TABLE_ROW);

      let sum = rowFemaleVoters;

      // eslint-disable-next-line array-callback-return
      voterAreaArray?.map((item, indexMap) => {
        if (indexMap !== index && item?.[IS_CHECKED]) {
          const value = parseInt(item?.[NUMBER_OF_VOTERS.COL_FEMALE]) | 0;
          sum = sum + value;
        }
      });

      setVoterCount((prev: VoterCount) => {
        return {
          ...prev,
          female: sum,
          total: Number(prev.male) + Number(prev.thirdGender) + sum,
        };
      });
    }
  };

  const onChangeThirdGenderVoter = (value: any) => {
    if (rowChecked && index !== undefined) {
      const row = getValues();

      const rowThirdGenderVoters = parseInt(value) | 0;

      const rowMaleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_MALE],
        ) | 0;

      const rowFemaleVoters =
        parseInt(
          row[INPUT_TYPE_TABLE_ROW]?.[index]?.[NUMBER_OF_VOTERS.COL_FEMALE],
        ) | 0;

      const rowTotalVoters =
        rowMaleVoters + rowFemaleVoters + rowThirdGenderVoters;

      setTotalVoteRow(rowTotalVoters);

      const voterAreaArray: any[] = watch(INPUT_TYPE_TABLE_ROW);

      let sum = rowThirdGenderVoters;

      // eslint-disable-next-line array-callback-return
      voterAreaArray?.map((item, indexMap) => {
        if (indexMap !== index && item?.[IS_CHECKED]) {
          const value = parseInt(item?.[NUMBER_OF_VOTERS.COL_THIRD_GENDER]) | 0;
          sum = sum + value;
        }
      });

      setVoterCount((prev: VoterCount) => {
        return {
          ...prev,
          thirdGender: sum,
          total: Number(prev.male) + Number(prev.female) + sum,
        };
      });
    }
  };

  return (
    <TableRow>
      {/* ভোটার এলাকা */}
      <TableData>
        <div className="d-flex align-items-center gap-4">
          <input
            {...register(`${INPUT_TYPE_TABLE_ROW}.${index}.${IS_CHECKED}`)}
            type="checkbox"
            // name={'testRiad'}
            id={areaCode as string}
            onChange={(e) => handleCheckBoxSelect(e)}
            //  getValues()?.[INPUT_TYPE_TABLE_ROW]?.[index]?.['isSelected']
          />
          <span>{voterArea}</span>
        </div>
      </TableData>
      {/* এরিয়া কোড */}
      <TableData>{areaCode}</TableData>

      {/* ভোটের সংখ্যা (পুরুষ ভোটার) - 1 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${NUMBER_OF_VOTERS.COL_MALE}`}
          onChangeVoterNumbers={onChangeMaleVoter}
          errors={errors}
        />
      </TableData>
      {/* ভোটের সংখ্যা (মহিলা ভোটার) - 2 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${NUMBER_OF_VOTERS.COL_FEMALE}`}
          onChangeVoterNumbers={onChangeFemaleVoter}
          errors={errors}
        />
      </TableData>
      {/* ====================================== */}
      {/* ভোটের সংখ্যা (হিজড়া ভোটার) - 3 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${NUMBER_OF_VOTERS.COL_THIRD_GENDER}`}
          onChangeVoterNumbers={onChangeThirdGenderVoter}
          errors={errors}
        />
      </TableData>
      {/* ====================================== */}
      {/* ভোটার ক্রম (পুরুষ- শুরু) - 4 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_MALE.COL_START}`}
          errors={errors}
        />
      </TableData>
      {/* ভোটার ক্রম (পুরুষ- শেষ) - 5 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_MALE.COL_FINISH}`}
          errors={errors}
        />
      </TableData>
      {/* ভোটার ক্রম (মহিলা- শুরু) 6 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_FEMALE.COL_START}`}
          errors={errors}
        />
      </TableData>
      {/* ভোটার ক্রম (মহিলা- শেষ)  7 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_FEMALE.COL_FINISH}`}
          errors={errors}
        />
      </TableData>
      {/* ভোটার ক্রম (হিজড়া- শুরু) 8 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_THIRD_GENDER.COL_START}`}
          errors={errors}
        />
      </TableData>
      {/* ভোটার ক্রম (হিজড়া- শেষ)  9 */}
      <TableData>
        <VoterAreaInputNumber
          registerName={`${INPUT_TYPE_TABLE_ROW}.${index}.${SERIAL_OF_VOTERS_THIRD_GENDER.COL_FINISH}`}
          errors={errors}
        />
      </TableData>
      {/* TOTAL_VOTE_ROW */}
      <TableData>{totalVoteRow}</TableData>
    </TableRow>
  );
};

export default InputTypeTableRow;
