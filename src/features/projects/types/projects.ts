export type ProjectStatus = "suspended" | "active" | "inactive" | "pending_payment";

export type Project = {
   _id: string;
   title: string;
   projectPlan: ProjectPlan;
   status: ProjectStatus;
   img: string;
   lastVisit: string;
   position: Position;
   users: User[];
   clientData: ClientData;
   city: string;
   lastUpdated: string;
   partnerClients: PartnerClient[];
   companyId: string;
   address: string;
   projectClientAdmin: string[];
   projectPlanData: ProjectPlanData;
   createdAt: string;
   incidents: Incident[];
};

export type ClientData = {
   title: string;
   _id: string;
};

export type IncidentItem = "RFI" | "incidents" | "task";

export type Incident = {
   _id: string;
   status: string;
   item: IncidentItem;
   description: string;
   owner: string;
   tag: string;
   coordinates: Coordinates;
   limitDate: string;
   createdAt: string;
   updatedAt: string;
};

export type Coordinates = {
   lat: number;
   lng: number;
};

export type PartnerClient = {
   _id: string;
   maxUsers: number;
   maxAdmins: number;
   maxStorage: number;
};

export type Position = {
   _id: string;
   lat: number;
   lng: number;
};

export type ProjectPlan = {
   _id: string;
};

export type ProjectPlanType = "small" | "big";

export type ProjectPlanData = {
   plan: ProjectPlanType;
};

export type User = {
   name: string;
   lastName: string;
};

export type Sort = "asc" | "";

export type ProjectsFilter = {
   projects: Project[];
   query?: string;
   sort?: Sort;
   incidentsNumber?: Sort;
   RFIsNumber?: Sort;
   tasksNumber?: Sort;
};
