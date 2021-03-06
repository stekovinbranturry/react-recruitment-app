import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, WingBlank } from 'antd-mobile';
import MainNavBar from '../../components/MainNavBar.jsx';
import HunterCard from '../../components/HunterCard.jsx';

const HunterLists = () => {
	const [jobs, setJobs] = useState([]);
	useEffect(() => {
		axios
			.get('/user/list?identity=hunter')
			.then(res => {
				if (res.data.code === 1400) {
					let tmp = [];
					res.data.doc.forEach(el => {
						tmp = [...tmp, ...el.jobsHunting];
					});
					setJobs([...jobs, ...tmp]);
				} else {
					Toast.info(res.data.msg);
				}
			})
			.catch(err => console.log(err));
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<MainNavBar title='BOSS列表' />
			<WingBlank>
				<HunterCard jobs={jobs} />
			</WingBlank>
		</Fragment>
	);
};

export default HunterLists;
