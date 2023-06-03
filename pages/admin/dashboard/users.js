import React from 'react';
import AdminLayout from '../../../components/admin/layout';
import UsersTable from '../../../components/admin/users/usersTable';

const UsersPage = ({users}) => {
  return (
    <AdminLayout>
      <UsersTable rows={users} />
    </AdminLayout>
  )
}

export default UsersPage;

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
