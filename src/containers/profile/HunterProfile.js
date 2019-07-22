import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import {
	NavBar,
	Grid,
	WhiteSpace,
	WingBlank,
	InputItem,
	List,
	TextareaItem,
	Flex,
	Button,
	Toast,
	Card
} from 'antd-mobile';
import {
	FORM_BLANK_ERROR,
	JOB_PUBLISH_SUCCESS,
	JOB_PUBLISH_FAILURE
} from '../../constants/info';
import { dateFormat } from '../../utils/date';

const avatars = [
	'boy',
	'bull',
	'chick',
	'crab',
	'girl',
	'hedgehog',
	'hippopotamus',
	'koala',
	'lemur',
	'man',
	'pig',
	'tiger',
	'whale',
	'woman',
	'zebra'
];

const data = avatars.map(item => ({
	icon: require(`../../image/avatars/${item}.png`),
	text: item
}));

function HunterProfile() {
	/**
	 * Get user profile and job list from db
	 * Run once only
	 */
	useEffect(() => {
		axios
			.post('/user/query')
			.then(res => {
				if (res.data.code === 1300) {
					const { avatar, jobsHunting } = res.data.doc;
					setAvatar(avatar);
					setJobs([...jobs, ...jobsHunting]);
				}
			})
			.catch(err => console.log(err));
		// eslint-disable-next-line
	}, []);

	/**
	 * Hooks
	 */
	const [avatar, setAvatar] = useState('');
	const [jobs, setJobs] = useState([]);
	const [input, setInput] = useState({
		company: '',
		title: '',
		salary: '',
		desc: ''
	});

	/**
	 * Handle actions
	 */
	const uploadAvatar = avatar => {
		axios
			.post('/user/update', { avatar })
			.then(res =>
				res.data.code === 1200 ? setAvatar(avatar) : Toast.info(res.data.msg)
			)
			.catch(err => console.log(err));
	};

	const publishJob = () => {
		const { company, title, salary, desc } = input;
		if (!company || !title || !salary || !desc) {
			Toast.info(FORM_BLANK_ERROR, 1);
			return;
		}
		const jobsHunting = {
			jobID: uuid(),
			company,
			title,
			salary,
			desc,
			createTime: dateFormat()
		};
		axios
			.post('/user/update', { jobsHunting })
			.then(res => {
				if (res.data.ok === 1) {
					Toast.info(JOB_PUBLISH_SUCCESS);
					setJobs([...jobs, jobsHunting]);
					setInput({
						company: '',
						title: '',
						salary: '',
						desc: ''
					});
				} else {
					Toast.info(JOB_PUBLISH_FAILURE);
				}
			})
			.catch(err => console.log(err));
	};

	/**
	 * Avatar component
	 */
	const avatarSelector = avatar ? (
		<Flex justify="center">
			<img
				className="avatar"
				src={require(`../../image/avatars/${avatar}.png`)}
				alt={avatar}
			/>
		</Flex>
	) : (
		<div>
			<div className="input-title">请选择头像：</div>
			<Grid data={data} columnNum={5} onClick={_el => uploadAvatar(_el.text)} />
		</div>
	);

	/**
	 * Jobs list published component
	 */
	const jobsList = jobs.map(item => {
		const { jobID, company, title, salary, desc, createTime } = item;
		return (
			<Card key={jobID}>
				<Card.Header title={title} extra={<span>{company}</span>} />
				<Card.Body>
					<div>{`薪资：${salary}`}</div>
					<div>{`要求：${desc}`}</div>
				</Card.Body>
				<Card.Footer content={`发布时间：${createTime}`} />
			</Card>
		);
	});

	return (
		<Fragment>
			<NavBar mode="dark">BOSS个人信息页</NavBar>
			<WingBlank>
				{avatarSelector}
				{jobs[0] ? (
					<div>
						<div className="input-title">已发布职位</div>
						{jobsList}
					</div>
				) : null}
				<div className="input-title">发布新职位</div>
				<List>
					<InputItem
						placeholder="XXX公司"
						value={input.company}
						onChange={v => setInput({ ...input, company: v })}
					>
						公司名称
					</InputItem>
					<InputItem
						placeholder="软件工程师"
						value={input.title}
						onChange={v => setInput({ ...input, title: v })}
					>
						职位名称
					</InputItem>
					<InputItem
						placeholder="10k - 20k"
						value={input.salary}
						onChange={v => setInput({ ...input, salary: v })}
					>
						薪资水平
					</InputItem>
					<TextareaItem
						title="职位描述"
						rows={5}
						placeholder="描述您即将发布的职位要求"
						autoHeight
						value={input.desc}
						onChange={v => setInput({ ...input, desc: v })}
					/>
				</List>
				<WhiteSpace size="lg" />
				<Button type="primary" onClick={publishJob}>
					确认发布
				</Button>
			</WingBlank>
		</Fragment>
	);
}

export default HunterProfile;
