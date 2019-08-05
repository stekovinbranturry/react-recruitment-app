import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, WhiteSpace } from 'antd-mobile';

const HunterCard = props =>
	props.jobs.map(({ _id, phone, company, title, salary, desc, createTime }) => (
		<div key={_id}>
			<Card onClick={() => props.history.push(`/chat/${phone}`)}>
				<Card.Header title={title} extra={<span>{company}</span>} />
				<Card.Body>
					<div>{`电话：${phone}`}</div>
					<div>{`薪资：${salary}`}</div>
					<div>{`要求：${desc}`}</div>
				</Card.Body>
				<Card.Footer content={`发布时间：${createTime}`} />
			</Card>
			<WhiteSpace />
		</div>
	));

export default withRouter(HunterCard);
