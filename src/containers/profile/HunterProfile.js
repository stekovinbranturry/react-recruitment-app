import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
	NavBar,
	Grid,
	WhiteSpace,
	WingBlank,
	InputItem,
	List,
	TextareaItem,
	Flex,
	Button
} from 'antd-mobile';
import { createJobsHuntingAction } from '../../reducers/user.redux';

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
	const [avatar, setAvatar] = useState('');
	const [company, setCompany] = useState('');
	const [title, setTitle] = useState('');
	const [salary, setSalary] = useState('');
	const [desc, setDesc] = useState('');

	const dispatch = useDispatch();

	const handlePublish = () => {
		dispatch(createJobsHuntingAction({ company, title, salary, desc }));
	};

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
			<Grid data={data} columnNum={5} onClick={_el => setAvatar(_el.text)} />
		</div>
	);

	return (
		<Fragment>
			<NavBar mode="dark">BOSS个人信息页</NavBar>
			<WingBlank>
				{avatarSelector}
				<div className="input-title">发布职位</div>
				<List>
					<InputItem
						placeholder="XXX公司"
						value={company}
						onChange={v => setCompany(v)}
					>
						公司名称
					</InputItem>
					<InputItem
						placeholder="软件工程师"
						value={title}
						onChange={v => setTitle(v)}
					>
						职位名称
					</InputItem>
					<InputItem
						placeholder="10k - 20k"
						value={salary}
						onChange={v => setSalary(v)}
					>
						薪资水平
					</InputItem>
					<TextareaItem
						title="职位描述"
						rows={5}
						placeholder="描述您即将发布的职位要求"
						autoHeight
						value={desc}
						onChange={v => setDesc(v)}
					/>
				</List>
				<WhiteSpace size="lg" />
				<Button type="primary" onClick={handlePublish}>
					确认发布
				</Button>
			</WingBlank>
		</Fragment>
	);
}

export default HunterProfile;
