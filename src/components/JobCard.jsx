import React from 'react';
import { Card, WhiteSpace } from 'antd-mobile';

const JobCard = ({ jobs }) =>
  jobs.map(({ _id, company, title, salary, desc, createTime }) => (
    <div key={_id}>
      <Card>
        <Card.Header title={title} extra={<span>{company}</span>} />
        <Card.Body>
          <div>{`薪资：${salary}`}</div>
          <div>{`要求：${desc}`}</div>
        </Card.Body>
        <Card.Footer content={`发布时间：${createTime}`} />
      </Card>
      <WhiteSpace />
    </div>
  ));

export default JobCard;
