package com.travelmaker.alarm.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.alarm.domain.AlarmDTO;
import com.travelmaker.user.domain.UserDTO;

@Transactional
@Repository
public class AlarmDAOImpl implements AlarmDAO {

	@Autowired
	private SqlSession sqlSession;

	@Override
	public void addAlarm(AlarmDTO alarmDTO) {
		sqlSession.insert("alarmSQL.addAlarm", alarmDTO);
	}

	@Override
	public List<AlarmDTO> getAlarmList(String seq) {
		UserDTO userDTO = sqlSession.selectOne("userSQL.getUserDTO", Integer.parseInt(seq));
		String requestFid = userDTO.getId() + "%" + userDTO.getRegisterMethod();
		return sqlSession.selectList("alarmSQL.getAlarmList", requestFid);
	}

	@Override
	public int alarmChange(int ano) {
		sqlSession.update("alarmSQL.alarmIsReadChange", ano);
		return sqlSession.selectOne("alarmSQL.getAlarmDataSeq", ano);
	}

	@Override
	public void alarmDelete(String dataseq) {
		sqlSession.delete("alarmSQL.alarmDelete", Integer.parseInt(dataseq));
	}

	@Override
	public List<AlarmDTO> getMyAlarmList(String userSeq, String con) {

		if (con.equals("1")) {
			return sqlSession.selectList("alarmSQL.getMyAlarmList", userSeq);
		} else if (con.equals("2")) {
			return sqlSession.selectList("alarmSQL.getMyAlarmListFriend", userSeq);
		} else if (con.equals("3")) {
			return sqlSession.selectList("alarmSQL.getMyAlarmListPurchase", userSeq);
		} else if (con.equals("4")) { // 매퍼 아직안함 --> 알람기능 해놓고
			return sqlSession.selectList("alarmSQL.getMyAlarmListLike", userSeq);
		} else if (con.equals("5")) { // 매퍼 아직안함 --> 알람기능 해놓고
			return sqlSession.selectList("alarmSQL.getMyAlarmListComment", userSeq);
		} else {
			return null;
		}
	}

	@Override
	public void deleteNreadAlarm(String requestFid, int con, int alarmType) {

		if (con == 1) { // 읽은 알람지우기
			if (alarmType == 1) { // 전체알람
				sqlSession.delete("alarmSQL.deleteNreadAlarm", requestFid);
			} else if (alarmType == 2) { // 동행알람
				sqlSession.delete("alarmSQL.deleteNreadAlarmFriend",requestFid);
			} else if (alarmType == 3) { // 대리구매알람
				sqlSession.delete("alarmSQL.deleteNreadAlarmPurchase",requestFid);
			} else if (alarmType == 4) { // 좋아요알람
				sqlSession.delete("alarmSQL.deleteNreadAlarmLike",requestFid);
			} else if (alarmType == 5) { // 댓글알람
				sqlSession.delete("alarmSQL.deleteNreadAlarmComment",requestFid);
			}

		} else if (con == 2) { // 모든 알람지우기
			if (alarmType == 1) {// 전체알람
				sqlSession.delete("alarmSQL.deleteAreadAlarm", requestFid);
			} else if (alarmType == 2) { // 동행알람
				sqlSession.delete("alarmSQL.deleteAreadAlarmFriend", requestFid);
			} else if (alarmType == 3) { // 대리구매알람
				sqlSession.delete("alarmSQL.deleteAreadAlarmPurchase", requestFid);
			} else if (alarmType == 4) { // 좋아요알람
				sqlSession.delete("alarmSQL.deleteAreadAlarmLike", requestFid);
			} else if (alarmType == 5) { // 댓글알람
				sqlSession.delete("alarmSQL.deleteAreadAlarmComment", requestFid);
			}
		} else {
			System.out.println("ERROR");
		}

	}

}
