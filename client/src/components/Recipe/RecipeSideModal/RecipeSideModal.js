import { RECIPE_FORM_KEYS } from '../../../utils/constants';
import Divider from '../../Common/Divider/Divider';
import { ARRAY_KEYS } from '../../../utils/constants';
import classes from './RecipeSideModal.module.css';

const RecipeSideModal = ({ data }) => {
  if (!data) return <p>Something went wrong</p>;

  const renderRow = (label, value) => (
    <div className="flex justify-between gap-[25px] px-[30px]">
      <label className="text-gray-900 text-base font-semibold text-nowrap">{label}</label>
      <div className={`text-gray-900 text-base ${classes.textRoot}`}>{value}</div>
    </div>
  );

  const tableRowStyle = {
    border: '2px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    fontWeight: '400',
    fontSize: '14px'
  };

  const tableRowHeaderStyle = {
    border: '2px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    fontSize: '15px'
  };

  const renderIngredients = () => (
    <div className="flex flex-col gap-[7px] px-[30px]">
      <label className="text-gray-900 text-base font-semibold">Ingredients -</label>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tr style={tableRowHeaderStyle}>
          <th style={tableRowHeaderStyle}>Name</th>
          <th style={tableRowHeaderStyle}>Quantity</th>
        </tr>
        {data[ARRAY_KEYS.DISPLAY_FN]?.[ARRAY_KEYS.VALUE]?.map((item, index) => (
          <tr style={tableRowStyle} key={index}>
            <th style={tableRowStyle}>{item[RECIPE_FORM_KEYS.NAME]}</th>
            <th style={tableRowStyle}>{item[RECIPE_FORM_KEYS.QUANTITY]}</th>
          </tr>
        ))}
      </table>
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="bg-indigo-600 h-[70px] w-full"></div>

      <div className="py-[30px] flex flex-col gap-[20px]">
        <Divider />
        {renderRow('Recipe Name -', data[RECIPE_FORM_KEYS.RECIPE_NAME])}
        <Divider />
        {renderRow('Updated At -', data[RECIPE_FORM_KEYS.UPDATED_AT])}
        <Divider />
        {renderRow('Created At -', data[RECIPE_FORM_KEYS.CREATED_AT])}
        <Divider />
        {renderIngredients()}
        <Divider />
        {renderRow('Description -', data[RECIPE_FORM_KEYS.DESCRIPTION])}
      </div>
    </div>
  );
};

export default RecipeSideModal;
