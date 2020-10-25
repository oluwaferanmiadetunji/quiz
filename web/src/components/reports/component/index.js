import React from 'react';
import Page from './Reports';
import { setTitle } from '../../layout/redux';
import { useDispatch } from 'react-redux';

function Reports() {
  const dispatch = useDispatch();
  dispatch(setTitle('Reports'));
  return <Page />;
}

export default Reports;
