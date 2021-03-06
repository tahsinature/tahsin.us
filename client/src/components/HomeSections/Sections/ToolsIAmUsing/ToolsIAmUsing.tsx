import React from 'react';
import { BuildRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import Header from 'src/components/Header/Header';
import Section from 'src/components/Section/Section';
import Capsule from 'src/components/Capsule/Capsule';
import classes from './ToolsIAmUsing.module.scss';
import data from 'src/api/data';

const ToolsIAmUsing = () => {
  const history = useHistory();
  return (
    <Section>
      <Header title="Tools I'm using nowadays" icon={<BuildRounded />} />
      <div className={classes.ToolBox}>{data.tools.map(ele => ele.display && <Capsule className={classes.Capsule} key={ele._id} logo={ele.image} title={ele.title} />)}</div>
      <Capsule className={classes.SeeMoreButton} type={1} logo={''} title={'See All'} clickHandler={() => history.push({ pathname: `/list/tools` })} />
    </Section>
  );
};

export default ToolsIAmUsing;
