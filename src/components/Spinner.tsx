import React, {FC} from 'react';
import { Spin } from 'antd';

const Spinner: FC = () => {
    return (
        <div className="spinner-wrapper">
            <Spin />
        </div>
    );
};

export default Spinner;
