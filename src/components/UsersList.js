import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import useThunk from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

function UsersList() {
	// For the loading part
	// using custom hook
	const [doFetchUsers, isLoadingUsers, loadingUsersError] =
		useThunk(fetchUsers);

	// For the creation part
	const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

	// For the loading part
	/* const [isLoadingUsers, setIsLoadingUsers] = useState(false);
	const [loadingUsersError,setLoadingUsersError] = useState(null); 

	// For the creation part
	const [isCreatingUser, setIsCreatingUser] = useState(false);
	const [creatingUserError, setCreatingUserError] = useState(null);
  */

	const { /* isLoading */ data /* error */ } = useSelector(state => {
		return state.users;
	});

	useEffect(() => {
		doFetchUsers();
		/* setIsLoadingUsers(true);
		dispatch(fetchUsers())
			.unwrap()
			// .then(() => )
			.catch(err => setLoadingUsersError(err))
			.finally(() => setIsLoadingUsers(false)); */
	}, [doFetchUsers]);
	// dispatch returns a promise but
	// .unwrap gives a brand new promise which executes .then if and only if promise is fulfilled and calls .catch if the promise is failed

	const handleUserAdd = () => {
		doCreateUser();
		/* dispatch(addUser())
			.unwrap()
			.catch(err => setCreatingUserError(err))
			.finally(() => setIsCreatingUser(false)); */
	};

	/* if (isLoading) {
		return (
			<Skeleton
				times={20}
				className='h-10 w-full'
			/>
		);
	}
	if (error) {
		return <div>Error fetching data...</div>;
	} */

	let content;
	if (isLoadingUsers) {
		content = (
			<Skeleton
				times={20}
				className='h-10 w-full'
			/>
		);
	} else if (loadingUsersError) {
		content = <div>Error fetching data...</div>;
	} else {
		content = data.map(user => {
			return (
				<UsersListItem
					key={user.id}
					user={user}
				/>
			);
		});
	}

	return (
		<div>
			<div className='flex flex-row justify-between items-center m-3'>
				<h1 className='m-2 text-xl'>Users</h1>
				<Button
					loading={isCreatingUser}
					onClick={handleUserAdd}
				>
					+ Add User
				</Button>
				{creatingUserError && 'Error creating user...'}
			</div>
			{content}
		</div>
	);
}

export default UsersList;
