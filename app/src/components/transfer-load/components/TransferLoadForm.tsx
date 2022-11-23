import classNames from 'classnames';
import { Field, Form } from 'formik';

import { EllipsisLoading } from '$/components/loading';
import InputWrapper from '$/components/input-wrapper/InputWrapper';

import { SelectOptionType } from '$/interfaces/select.interface';

const transactionTypes: SelectOptionType[] = [
  { value: '', label: 'Select', disabled: true, hidden: true },
  { value: 'DEPOSIT', label: 'Deposit' },
  { value: 'TRANSFER', label: 'Transfer' },
  { value: 'WITHDRAW', label: 'Withdraw' }
];

interface TransferLoadProps {
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  isSend: boolean;
}

const TransferLoad = ({ touched, errors, isSend }: TransferLoadProps) => {
  return (
    <Form>
      <h3>{isSend ? 'Transfer Fund' : 'Load Fund'}</h3>

      {isSend && (
        <InputWrapper label="email" touched={touched.email} error={errors.email} required>
          <Field type="text" id="email" name="email" className="formik__input" />
        </InputWrapper>
      )}

      <InputWrapper label="amount" touched={touched.amount} error={errors.amount} required>
        <Field type="number" id="amount" name="amount" className="formik__input" />
      </InputWrapper>

      <InputWrapper label="type" touched={touched.type} error={errors.type} required>
        <Field as="select" id="type" name="type" className="formik__input">
          {transactionTypes.map(({ label, value, disabled, hidden }: SelectOptionType, index: number) => (
            <option key={index} value={value} disabled={disabled} hidden={hidden}>
              {label}
            </option>
          ))}
        </Field>
      </InputWrapper>

      {isSend && (
        <InputWrapper label="remark" touched={touched.remark} error={errors.remark} required>
          <Field as="textarea" id="remark" name="remark" className="formik__input formik__textarea" />
        </InputWrapper>
      )}

      <div className="formik__content mt-40 flex align-items-center justify-content-space-between">
        <button type="submit" disabled={false} className="button primary-button min-wpx-100">
          <span className={classNames({ invisible: false })}>Transfer</span>
          {false && <EllipsisLoading color="white" position="absolute" />}
        </button>
      </div>
    </Form>
  );
};

export default TransferLoad;
