import apiClient from "@/apiClient";

const attendanceAPIController = {
    getAllAttendanceByStudentIdToParents: async () => {
        try {
            const response = await apiClient.get(`/attendance/class/by-student-id/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    getTodayAttendanceStatus: async () => {
        try {
            const response = await apiClient.get(`/attendance/class/by-student-id/today/to-parents`);
            if (response.status === 200 && response.data.state === "OK") {
                return response.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};

export default attendanceAPIController;
