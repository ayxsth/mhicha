export const getHeader = (userId: number, senderId: number, receiverId: number) => {
  if (userId === senderId && userId === receiverId) {
    return 'Self Load';
  }

  if (userId === senderId) {
    return 'Sent';
  }

  if (userId === receiverId) {
    return 'Received';
  }
};
