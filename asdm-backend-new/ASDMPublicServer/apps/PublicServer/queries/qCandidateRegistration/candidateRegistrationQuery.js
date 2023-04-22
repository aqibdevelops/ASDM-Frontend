/**
 * Created by sandeepsi
 */
let query = {
	/*********************************************************************************************/
	countryArr: "SELECT country.pklCountryId AS countryId," +
		"country.vsCountryName AS countryName" +
		" FROM nw_jvms_joint_venture_country jvCountry" +
		" INNER JOIN nw_mams_country country ON country.pklCountryId=jvCountry.fklCountryId" +
		" WHERE jvCountry.fklJvId=? ORDER BY country.vsCountryName",
	/*********************************************************************************************/
	stateId: `SELECT state.fklStateId AS stateId FROM nw_jvms_joint_venture_state state`,
	/*********************************************************************************************/
	state: "SELECT state.pklStateId AS stateId, state.vsStateName AS stateName FROM nw_mams_state state WHERE state.fklCountryId=97 ORDER BY state.vsStateName",
	/*********************************************************************************************/
	districtList: "SELECT district.pklDistrictId AS districtId, district.vsDistrictName AS districtName  FROM vw_district_assam district",
	/*********************************************************************************************/
	district: "SELECT district.pklDistrictId AS districtId," +
		"district.vsDistrictName AS districtName" +
		" FROM nw_jvms_joint_venture_state jvState" +
		" INNER JOIN nw_mams_state state ON state.pklStateId=jvState.fklStateId" +
		" INNER JOIN nw_mams_district district ON district.fklStateId=state.pklStateId" +
		" WHERE jvState.fklJvId=? AND district.fklStateId=? ORDER BY district.vsDistrictName",
	/*********************************************************************************************/
	taluka: "SELECT taluka.pklTalukaId AS talukaId," +
		"taluka.vsTalukaName AS talukaName" +
		" FROM nw_jvms_joint_venture_state jvState" +
		" INNER JOIN nw_mams_state state ON state.pklStateId=jvState.fklStateId" +
		" INNER JOIN nw_mams_district district ON district.fklStateId=state.pklStateId" +
		" INNER JOIN nw_mams_taluka taluka ON taluka.fklDistrictId=district.pklDistrictId" +
		" WHERE jvState.fklJvId=? AND taluka.fklDistrictId=? ORDER BY taluka.vsTalukaName",
	/*********************************************************************************************/
	ulb: "SELECT ulb.pklUlbId AS ulbId," +
		" ulb.vsUlbName AS ulbName" +
		" FROM nw_jvms_joint_venture_state jvState " +
		" INNER JOIN nw_mams_state state ON state.pklStateId=jvState.fklStateId " +
		" INNER JOIN nw_mams_district district ON district.fklStateId=state.pklStateId " +
		" INNER JOIN nw_mams_ulb ulb ON ulb.fklDistrictId = district.pklDistrictId " +
		" WHERE jvState.fklJvId=? AND ulb.fklDistrictId=? ORDER BY ulb.vsUlbName",
	/*********************************************************************************************/
	religion: `SELECT 
	religion.pklReligionId AS religionId, religion.vsReligionName AS religionName 
  	FROM
	nw_mams_religion religion`,
	/*********************************************************************************************/
	assembly: `SELECT  
	assembly.pklAssemblyConstituencyId AS assemblyId,
	assembly.vsConstituencyName AS assemblyName
	FROM nw_mams_constituency_assembly assembly
	INNER JOIN nw_mams_constituency_loksabha lokasbha ON lokasbha.pklLoksabhaConstituencyId = assembly.fklLoksabhaConstituencyId
	WHERE lokasbha.pklLoksabhaConstituencyId=? `,
	/*********************************************************************************************/
	council: `SELECT loksabha.pklLoksabhaConstituencyId AS constituencyId ,
    loksabha.vsConstituencyName AS constituencyName
    FROM nw_mams_constituency_loksabha loksabha ORDER BY loksabha.vsConstituencyName `,
	/*********************************************************************************************/
	course: `SELECT DISTINCT(course.pklCourseId) AS courseId, course.vsCourseName AS courseName FROM nw_enms_entity entity
	INNER JOIN nw_enms_entity_address address ON address.fklEntityId = entity.pklEntityId
	INNER JOIN nw_cems_center_course_association courseAssociation ON courseAssociation.fklCenterId = entity.pklEntityId
	INNER JOIN nw_coms_course course ON course.pklCourseId = courseAssociation.fklCourseId
	WHERE address.fklDistrictId =? AND course.fklCourseCategoryId =? AND course.fklSectorId=?`,
	/*********************************************************************************************/
	getAllowPreference: `SELECT preference.bSectorPreferenceAllow AS allowSectorPreference,
	preference.bDistrictPrefernceAllow AS alloDistrictPreference
	FROM nw_candidate_open_pool_preference_allow preference WHERE preference.fklJvId = ?`,
	/*********************************************************************************************/
	getConfigArr: `SELECT config. vsConfigDetails as ConfigDetails  FROM nw_candidate_open_pool_config config WHERE config. fklJvId =?`,
	/*********************************************************************************************/
	courseCategory: `SELECT courseCategory. pklCourseCategoryId  AS courseCategoryId,
	courseCategory. vsName  AS courseCategoryName
	FROM nw_coms_course_category courseCategory where courseCategory.fklJvId= ? order by courseCategory.vsName`,
	/*********************************************************************************************/
	sector: `SELECT
	DISTINCT(sector.pklSectorId ) AS sectorId,
	sector.vsSectorName  AS sectorName 
	FROM nw_coms_course course
	INNER JOIN nw_coms_course_category category ON category. pklCourseCategoryId  = course. fklCourseCategoryId 
	INNER JOIN nw_coms_sector sector ON sector. pklSectorId  = course. fklSectorId 
	WHERE category.fklJvId  = ? AND category. pklCourseCategoryId=? ORDER BY sector.vsSectorName`,
	/*********************************************************************************************/
	category: "SELECT caste.pklCasteId AS categoryId,caste.vsCasteName AS categoryName FROM nw_mams_caste caste ORDER BY caste.vsCasteName",
	/*********************************************************************************************/
	qualification: "SELECT qualification.pklQualificationId AS qualificationId,qualification.vsQualification AS qualificationName FROM nw_mams_qualification qualification order by qualification.vsQualification",
	/*********************************************************************************************/
	gender: "SELECT gender.pklGenderId AS genderId,gender.vsGenderName AS genderName FROM nw_mams_gender gender ORDER BY gender.vsGenderName",
	/*********************************************************************************************/
	// idCheckInOpenPool: "SELECT COUNT(openPool.pklOpenPoolId) AS rowCount FROM nw_candidate_open_pool openPool WHERE openPool.fklJvId=? AND openPool.vsIdNumber=?",
	idCheckInCandidate: "SELECT COUNT(DISTINCT(candidateBasic.pklCandidateId)) AS rowCount" +
		" FROM nw_candidate_basic_dtl candidateBasic" +
		" WHERE candidateBasic.fklJvId=? AND candidateBasic.uuid=?",
	/*********************************************************************************************/
	// emailCheckInOpenPool: "SELECT COUNT(openPool.pklOpenPoolId) AS rowCount FROM nw_candidate_open_pool openPool WHERE openPool.fklJvId=? AND openPool.vsEmail1=?",
	emailCheckInCandidate: "SELECT COUNT(DISTINCT(candidateBasic.pklCandidateId)) AS rowCount" +
		" FROM nw_candidate_contact_dtl candidateContact" +
		" INNER JOIN nw_candidate_basic_dtl candidateBasic ON candidateBasic.pklCandidateId=candidateContact.fklCandidateId" +
		" WHERE candidateBasic.fklJvId=? AND candidateContact.vsPrimaryEmail=?",
	/*********************************************************************************************/
	// mobileCheckInOpenPool: "SELECT COUNT(openPool.pklOpenPoolId) AS rowCount FROM nw_candidate_open_pool openPool WHERE openPool.fklJvId=? AND openPool.vsMobile1=?",
	mobileCheckInCandidate: "SELECT COUNT(DISTINCT(candidateBasic.pklCandidateId)) AS rowCount" +
		" FROM nw_candidate_contact_dtl candidateContact" +
		" INNER JOIN nw_candidate_basic_dtl candidateBasic ON candidateBasic.pklCandidateId=candidateContact.fklCandidateId" +
		" WHERE candidateBasic.fklJvId=? AND candidateContact.vsPrimaryMobileNo=?",
	/*********************************************************************************************/
	getDistrictCode: "SELECT district.pklDistrictId AS districtCode FROM nw_mams_district district WHERE district.pklDistrictId=? ORDER BY district.pklDistrictId",
	/*********************************************************************************************/
	getCandidateCount: "SELECT COUNT(openPool.pklOpenPoolId) AS rowCount FROM nw_candidate_open_pool openPool FOR UPDATE",
	idType: "SELECT idType.pklIdType AS categoryId,idType.vsIdTypeDisplayName AS categoryName FROM nw_mams_id_type idType",
	/*********************************************************************************************/
	saveBasicDetails: `INSERT INTO nw_candidate_basic_dtl
	(fklJvId,vsFirstName,vsMiddleName,vsLastName,
	vsCertName, vsFatherName, vsMotherName, vsEmpExchangeNo, dtDOB,
	UUID, vsGender, fklRelegionId, fklRegistrationTypeId,
	dtRegistrationDate,bIsBPLCardHolder,bIsAntodayaCardHolder,bIsNregaCardHolder,
	bIsMinority, bIsBoCw, bIsTeaTribeMinoriy, idType, vsStatus)
	VALUES
	(?,?,?,?,
	?,?,?,?,
	?,?,?,?,
	?,?,?,?,
	?,?,?,?,?,?)`,
	/*********************************************************************************************/
	saveRelation:`INSERT INTO nw_candidate_family_dtl(fklCandidateId, fklRelationshipId, vsName, vsGender) VALUES (?,?,?,?)`,
	/*********************************************************************************************/
	saveCasteDetails: `INSERT INTO nw_candidate_caste_dtl(fklCandidateId, fklCasteCategoryId,dtModified)VALUES(?,?,?)`,
	/*********************************************************************************************/
	saveContactDetails: `INSERT INTO nw_candidate_contact_dtl
	(fklCandidateId,vsPrimaryMobileCountryCode,vsPrimaryMobileNo,vsOtherMobileNo,vsPrimaryEmail,dtModified) 
	VALUES(?,?,?,?,?,?)`,
	/*********************************************************************************************/
	saveQualificationDetails: `INSERT INTO nw_candidate_qualification_dtl(fklCandidateId, fklQualificationId)VALUES(?,?)`,
	/*********************************************************************************************/
	saveCoursePreference: `INSERT INTO nw_candidate_course_preference(fklJvId, fklCandidateId, fklDistrictId, fklTalukaId, fklCourseId, dtModifiedDate) VALUES(?,?,?,?,?,?)`,
	/*********************************************************************************************/
	saveDisabilityDetails: `INSERT INTO nw_candidate_disability_dtl(fklCandidateId,bIsDisability,dtModified) VALUES (?,?,?)`,
	/*********************************************************************************************/
	saveAddressDetails: `INSERT INTO nw_candidate_address_dtl
	(fklCandidateId,dtModified,fklCountryId,fklStateId, 
	fklDistrictId, fklTalukaId, fklUlbId, vsAreaType, vsAddress,
	vsCityName, vsPoliceStation, vsPinCode,vsAddressType,
	fklAssemblyConstituencyId, fklLoksabhaConstituencyId,
	vsPostOffice)
	VALUES
	( ? , ? , ? , ?,
	? , ? , ? , ? , ? ,
	? , ? , ? , ? ,
	? , ?, ?)`,
	updateNotificationStatus: `UPDATE nw_candidate_basic_dtl basic SET basic.bSMSSent = ?,basic.bMailSent = ?,basic.vsReferenceNumber = ? WHERE basic.pklCandidateId = ?`,
	/*********************************************************************************************/
	getDistrictName: "SELECT district.vsDistrictName AS districtName FROM nw_mams_district district WHERE district.pklDistrictId IN (?) ORDER BY district.pklDistrictId",
	/*********************************************************************************************/
	getSectorName: "SELECT sector.vsSectorName AS sectorName FROM nw_coms_sector sector WHERE sector.fklJvId=? and sector.pklSectorId in (?) ORDER BY sector.pklSectorId",
	/*********************************************************************************************/
	// maanyaj
	/*********************************************************************************************/
	email1DuplicateCheck: `SELECT  COUNT(DISTINCT contactDtl.fklCandidateId) AS candidateCount
		FROM nw_candidate_contact_dtl contactDtl
		WHERE contactDtl.vsPrimaryEmail=?`,
	/*********************************************************************************************/
	saveEmailOtp: `INSERT INTO nw_public_registration(vsEmailId, iEmailOTP, vsOTPType, dtStartDate, 
		dtEndDate, dtCreatedDate, dtModifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?) `,
	/*********************************************************************************************/
	updateEmailOtp: `UPDATE nw_public_registration 
		SET bEmailSent=?, dtModifiedDate=?
		WHERE pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	verifyOtp: `SELECT publicRegistration.dtEndDate AS expiryDate 
		FROM nw_public_registration publicRegistration 
		WHERE publicRegistration.pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	updateEmail1Verified: `UPDATE nw_public_registration 
		SET bEmailVerified=? 
		WHERE pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	mobile1DuplicateCheck: `SELECT COUNT(DISTINCT contactDtl.fklCandidateId) AS candidateCount
		FROM nw_candidate_contact_dtl contactDtl
		WHERE contactDtl.vsPrimaryMobileNo = ?`,
	/*********************************************************************************************/
	saveSmsOtp: `UPDATE nw_public_registration 
		SET vsMobileNumber=?, iSmsOTP=?, dtModifiedDate=? 
		WHERE pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	insertSmsOtp: `INSERT INTO nw_public_registration(vsMobileNumber, iSmsOTP, vsOTPType, dtStartDate, 
		dtEndDate, dtCreatedDate, dtModifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
	/*********************************************************************************************/
	updateSmsOtp: `UPDATE nw_public_registration 
		SET bSMSSent=?, dtModifiedDate=? 
		WHERE pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	updateMobile1Verified: `UPDATE nw_public_registration 
		SET  bSmsVerified=? 
		WHERE pklPublicRegistrationId=?`,
	/*********************************************************************************************/
	relocationPreference: `INSERT INTO nw_candidate_relocation_preference(fklCandidateId, 
		vsDistrictPreference1, vsDistrictPreference2, vsDistrictPreference3, vsStatePreference1, 
		vsStatePreference2, vsStatePreference3, bCountryPreference) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

	// new code by AnkitS
	
	/*********************************************************************************************/
	courseCategoryNameFromId: `SELECT vsName AS courseCategoryName FROM nw_coms_course_category WHERE pklCourseCategoryId = ?;`,
	/*********************************************************************************************/
	districtNameFromId: `SELECT vsDistrictName AS districtName FROM nw_mams_district WHERE pklDistrictId = ?;`,
	/*********************************************************************************************/
	courseNameFromId: `SELECT vsCourseName AS courseName FROM nw_coms_course WHERE pklCourseId = ?;`,
	/*********************************************************************************************/
	sectorNameFromId: `SELECT vsSectorName AS sectorName FROM nw_coms_sector WHERE pklSectorId = ?;`

	// new code by AnkitS ends
}
module.exports = exports = query;