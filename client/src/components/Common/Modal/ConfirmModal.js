/* eslint-disable no-unused-vars */
import classes from './Modal.module.css';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';

const ConfirmModal = ({
  showModal = false,
  onSuccess,
  onCancel,
  onClose = () => {},
  text = ''
}) => {
  return (
    <div>
      <Rodal
        visible={showModal}
        onClose={onClose}
        animation="zoom"
        className={`${classes.unsavedRoot}`}
        showCloseButton={false}>
        <div className="bg-white rounded-lg h-[270px] overflow-hidden border-2 border-gray-800">
          <div className="h-[110px] flex justify-center items-center mt-[10px]">
            <ErrorOutlineIcon sx={{ width: '93px', height: '85px', color: 'red' }} />
          </div>
          <div className="flex justify-center items-center mt-[10px]">
            <div
              className="text-gray-900 text-base text-center font-semibold px-10 leading-3 break-all"
              dangerouslySetInnerHTML={{ __html: text }}></div>
          </div>
          <div className="flex justify-center items-center mt-[30px] gap-[20px] px-10 ">
            <Button
              variant="contained"
              sx={{ height: '36px', width: '120px', margin: 'auto 0', backgroundColor: '#03C988' }}
              onClick={onCancel}>
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{ height: '36px', width: '120px', margin: 'auto 0', backgroundColor: '#FF004D' }}
              onClick={onSuccess}>
              Yes
            </Button>
          </div>
        </div>
      </Rodal>
    </div>
  );
};
export default ConfirmModal;
