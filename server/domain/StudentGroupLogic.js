const {Groups, Schools, Students} = require('../models/');

class StudentGroupLogic {
    //async getAllGroupsBySchool(schoolId) {
    //    try {
    //        console.log(schoolId)
    //        const groups = await Groups.findAll({
    //            where: { "schoolId": schoolId }
    //        });
    //        
    //        if (!groups) {
    //            throw new Error('Groups not found');
    //        }
    //
    //        for (let i = 0; i < groups.length; i++) {
    //            const group = groups[i];
    //    
    //            const students = await group.getStudents();
    //    
    //            const studentNames = students.map(student => {
    //                const { firstName, lastName, ...rest } = student;
    //                return `${firstName} ${lastName}`;
    //            });
    //    
    //            group.dataValues.students = studentNames;            
    //        }
    //
    //        const responseData = groups.map(group => ({
    //            id: group.id,
    //            students: group.dataValues.students,
    //            memberCount: group.dataValues.students.length,
    //            capacity: group.capacity
    //        }));
    //        return responseData;
    //        
    //    } catch (error) {
    //        throw new Error('Failed to find groups from school ' +schoolId + ": " + error);
    //    }
    //}

    async joinGroup(groupId, userEmail) {
        try {
            const group = await Groups.findOne({
                where: { "id": groupId }
            });
            if (!group) {
                throw new Error('Group not found');
            }
            const user = await Students.findOne({
                where: { "email": userEmail }
            });
            if (!user) {
                throw new Error('User not found');
            }
            if (user.groupId == groupId) {
                throw new Error('User already in a group');
            }

            const currentSize = await group.getStudents();
            if(currentSize !== undefined) {
                const hasRoom = group.capacity - currentSize.length;
                if (!hasRoom) {
                    throw new Error('Group is full');
                }
            }

            await Students.update(
                { "groupId": groupId },
                { where: { "email": userEmail }}
            );

            const updatedGroup = await Groups.findOne({
                where: { "id": groupId }
            });

            const students = await updatedGroup.getStudents();
    
            const studentNames = students.map(student => {
                const { firstName, lastName, ...rest } = student;
                return `${firstName} ${lastName}`;
            });
        
            updatedGroup.dataValues.students = studentNames;            
            

            const responseData = {
                id: updatedGroup.id,
                students: updatedGroup.dataValues.students,
                memberCount: updatedGroup.dataValues.students.length
            };

            return responseData;

        } catch (error) {
            throw new Error('Failed to join group ' + error);
        }
    }

    
}

module.exports = new StudentGroupLogic();
