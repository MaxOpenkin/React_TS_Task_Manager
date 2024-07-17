// import { useState } from "react";
// import User from "./User";
// import { addUser, IUser } from "../redux/usersSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";

// const UserList = () => {
//   const { users, status } = useSelector((state: RootState) => state.users);
//   const [newUser, setNewUser] = useState<Omit<IUser, "id">>({
//     name: "",
//     company: { name: "" },
//     phone: "",
//   });

//   const dispatch: AppDispatch = useDispatch();

//   const handleAddUser = () => {
//     if (newUser.name.trim() && newUser.company.name.trim() && newUser.phone.trim()) {
//       dispatch(
//         addUser({ ...newUser, id: users.length + 1 })
//       );
//       setNewUser({
//         name: "",
//         company: { name: "" },
//         phone: "",
//       });
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4 text-center">User Manager App</h1>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           className="form-control"
//           placeholder="New User Name"
//         />
//         <input
//           type="text"
//           value={newUser.company.name}
//           onChange={(e) => setNewUser({ ...newUser, company: { name: e.target.value } })}
//           className="form-control"
//           placeholder="New User Company Name"
//         />
//         <input
//           type="text"
//           value={newUser.phone}
//           onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//           className="form-control"
//           placeholder="New User Phone"
//         />
//         <button onClick={handleAddUser} className="btn btn-primary">
//           Add User
//         </button>
//       </div>
//       <div>
//         {status === "loading" && (
//           <div className="spinner-border text-warning" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         )}
//         {status === "success" &&
//           users.map((user, index) => (
//             <User key={index} user={user} index={index} />
//           ))}
//         {status === "error" && (
//           <>Error!</>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserList;






// import axios from "axios";
// import { ChangeEvent, Component, ReactNode } from "react";
// import User from "./User";
// import UserDetails from "./UserDetails";
// import { IUser } from "../redux/usersSlice";

// export interface IUser {
//   id: number;
//   name: string;
//   company: { name: string };
//   phone: string;
//   email?: string;
//   website?: string;
//   address?: {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: {
//       lat: string;
//       lng: string;
//     };
//   };
// }

// interface IProps {
//   setUser: (user: IUser | null) => void;
//   setChange: React.Dispatch<React.SetStateAction<(() => void) | null>>; // Изменение здесь
// }


// interface IState {
//   users: IUser[];
//   newUser: Omit<IUser, "id">;
//   isDetails: boolean;
//   userDetails: IUser | null;
// }

// class UserList extends Component<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       users: [],
//       newUser: {
//         company: {
//           name: "",
//         },
//         name: "",
//         phone: "",
//       },
//       isDetails: false,
//       userDetails: null,
//     };
//   }

//   componentDidMount(): void {
//     axios
//       .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         this.setState({ ...this.state, users: response.data });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   addUser = () => {
//     this.setState((prevState) => ({
//       users: [
//         {
//           id: this.state.users.length + 1,
//           company: { name: this.state.newUser.company.name },
//           name: this.state.newUser.name,
//           phone: this.state.newUser.phone,
//         },
//         ...prevState.users,
//       ],
//       newUser: {
//         company: {
//           name: "",
//         },
//         name: "",
//         phone: "",
//       },
//     }));
//   };

//   deleteUser = (userId: number) => {
//     this.setState((prevState) => ({
//       ...prevState,
//       users: prevState.users.filter((user) => user.id !== userId),
//       newUser: { ...prevState.newUser },
//     }));
//   };

//   editUser = (updatedUser: IUser) => {
//     this.setState((prevState) => ({
//       users: prevState.users.map((user) =>
//         user.id === updatedUser.id ? updatedUser : user
//       ),
//       newUser: { ...prevState.newUser },
//     }));
//   };

//   handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { value, name } = e.target;

//     if (name === "company") {
//       this.setState({
//         ...this.state,
//         newUser: { ...this.state.newUser, company: { name: value } },
//       });
//       return;
//     }

//     this.setState({
//       ...this.state,
//       newUser: {
//         ...this.state.newUser,
//         [name === "name" ? "name" : "phone"]: value,
//       },
//     });
//   };

//   changeIsDetails = (userDetails: IUser | null) =>
//     this.setState((prevState) => ({
//       ...prevState,
//       isDetails: !prevState.isDetails,
//       userDetails,
//     }));

//   render(): ReactNode {
//     return this.state.isDetails ? (
//       this.state.userDetails && <UserDetails changeIsDetails={this.changeIsDetails} {...this.state.userDetails} />
//     ) : (
//       <div className="container mt-4">
//         <h1 className="mb-4 text-center">User List App</h1>
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             value={this.state.newUser.name}
//             name="name"
//             onChange={(e) => this.handleInputChange(e)}
//             className="form-control"
//             placeholder="New User Name"
//           />
//           <input
//             type="text"
//             value={this.state.newUser.company.name}
//             name="company"
//             onChange={(e) => this.handleInputChange(e)}
//             className="form-control"
//             placeholder="New User Company Name"
//           />
//           <input
//             type="text"
//             value={this.state.newUser.phone}
//             name="phone"
//             onChange={(e) => this.handleInputChange(e)}
//             className="form-control"
//             placeholder="New User Phone"
//           />
//           <button onClick={this.addUser} className="btn btn-primary">
//             Add User
//           </button>
//         </div>
//         <div>
//           {this.state.users.map((user) => (
//             <User
//               key={user.id}
//               user={user}
//               deleteUser={() => this.deleteUser(user.id)}
//               editUser={this.editUser}
//               changeIsDetails={this.changeIsDetails}
//               setUser={this.props.setUser}
//               setChange={this.props.setChange}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default UserList;
