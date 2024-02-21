use quantum_schema;
SELECT wd.id,wd.walkinTitle,wd.walkinNotes,wd.walkinStartingDate,wd.walkinEndingDate,wd.walkinAddress,wd.walkinCity,wd.walkinThingsToRemember,
	wi.generalInstructions,wi.examInstructions,wi.systemRequirements,wi.processDetails,
    wjr.id AS walkinJobRoleId,ejr.id AS enumJobRoleId,ejr.roleName,ejr.grossCompensationPackage,ejr.roleDescription,ejr.requirements,
    wts.id AS walkinTimeSlotId,wts.timeSlot
	FROM walkin_data wd
	JOIN walkin_instruction wi
		ON wd.id = wi.walkinId
	JOIN walkin_jobRole wjr
		ON wd.id = wjr.walkinId
	JOIN enum_job_role ejr
		ON wjr.jobRoleId = ejr.id
	JOIN walkin_timeslot wts
		ON wts.walkInId = wd.id
	ORDER BY wd.id;
	