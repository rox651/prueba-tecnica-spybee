export const getUserInitials = (name: string, lastName: string) => {
   return name[0].toUpperCase() + lastName[0].toUpperCase();
};
