interface User {
    _id: any;
    userType: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    // token: string; not sure if I need it right here
    visits?: {date: string, hour: string, id: number, status: string, patientName: string,
        doctorName: string, patientId: string, doctorId: string, read?: boolean,
        exam?: {weight: number, heartRate: number, bloodPressure: number, medHistory: string,
            diagnosis: string, prescription: string, advices: string} }[];
    lastLogged?: string[];
    npi?: number;
    specialty?: string;
    city?: string;
    profilePic?: string;
    rates?: any[];
    rating?: number;
}

export default User;