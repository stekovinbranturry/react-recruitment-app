import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';

const ResumeCard = ({ list }) =>
  list.map(
    ({
      _id,
      name,
      age,
      phone,
      position,
      education,
      skills,
      workExperience,
      projectExperience
    }) => (
      <div key={_id}>
        <Card>
          <Card.Header title={name} extra={<span>{position}</span>} />
          <Card.Body>
            <div>{`年齡：${age}`}</div>
            <WhiteSpace size='sm' />
            <div>{`學歷：${education}`}</div>
            <WhiteSpace size='sm' />
            <div>{`技能：${skills}`}</div>
            <WhiteSpace size='sm' />
            <div>{`工作經歷：${workExperience}`}</div>
            <WhiteSpace size='sm' />
            <div>{`項目經歷：${projectExperience}`}</div>
            <WhiteSpace size='sm' />
          </Card.Body>
          <Card.Footer content={`電話：${phone}`} />
        </Card>
        <WhiteSpace />
      </div>
    )
  );

export default ResumeCard;
