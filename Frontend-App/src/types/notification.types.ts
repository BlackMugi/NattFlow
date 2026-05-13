export interface NotificationResponseDTO {
  idNotification: number;
  type: string;
  titre: string;
  message: string;
  lu: boolean;
  dateCreation: string;
  idUser: number;
  nomUser: string;
  prenomUser: string;
}

export interface NotificationCreateDTO {
  type: string;
  titre: string;
  message: string;
  idUser: number;
}

export interface BroadcastNotificationDTO {
  type: string;
  titre: string;
  message: string;
}