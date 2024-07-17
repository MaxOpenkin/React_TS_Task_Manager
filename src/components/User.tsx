// import React, { FC, useRef, RefObject } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../redux/store";
// import { deleteUser, editUser, IUser } from "../redux/usersSlice";


// interface IProps {
//   user: IUser;
//   index: number;
// }

// const User: FC<IProps> = ({ user, index }) => {
//   const [isEdit, setIsEdit] = React.useState(false);
//   const nameRef: RefObject<HTMLInputElement> = useRef(null);
//   const companyRef: RefObject<HTMLInputElement> = useRef(null);
//   const phoneRef: RefObject<HTMLInputElement> = useRef(null);

//   const dispatch: AppDispatch = useDispatch();

//   const handleDeleteUser = () => {
//     dispatch(deleteUser(index));
//   };

//   const handleClickSave = () => {
//     if (nameRef.current && companyRef.current && phoneRef.current) {
//       dispatch(
//         editUser({
//           id: index,
//           name: nameRef.current.value,
//           company: { name: companyRef.current.value },
//           phone: phoneRef.current.value,
//         })
//       );
//       setIsEdit(false);
//     }
//   };

//   return (
//     <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//       <div className="card-body">
//         {isEdit ? (
//           <div>
//             <input
//               ref={nameRef}
//               defaultValue={user.name}
//               className="form-control mb-2"
//             />
//             <input
//               ref={companyRef}
//               defaultValue={user.company.name}
//               className="form-control mb-2"
//             />
//             <input
//               ref={phoneRef}
//               defaultValue={user.phone}
//               className="form-control mb-2"
//             />
//             <button onClick={handleClickSave} className="btn btn-success btn-sm me-2">
//               Save
//             </button>
//           </div>
//         ) : (
//           <div className="d-flex align-items-center">
//             <div style={{ flexGrow: 1 }}>
//               <h5 className="card-title">{user.name}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">
//                 {user.company.name}
//               </h6>
//               <p className="card-text">{user.phone}</p>
//             </div>
//             <button onClick={() => setIsEdit(true)} className="btn btn-warning btn-sm me-2">
//               Edit
//             </button>
//             <button onClick={handleDeleteUser} className="btn btn-danger btn-sm">
//               Del
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default User;





// import { ChangeEvent, Component } from "react";

// import style from "../styles/User.module.css";
// import { NavLink } from "react-router-dom";
// import { IUser } from "../redux/usersSlice";

// interface IProps {
//   user: IUser;
//   deleteUser: () => void;
//   editUser: (user: IUser) => void;
//   changeIsDetails: (userDetails: IUser | null) => void;
//   setUser: (user: IUser) => void;
//   setChange: React.Dispatch<React.SetStateAction<(() => void) | null>>; // Изменение здесь
// }

// interface IState {
//   isEdit: boolean;
//   name: string;
//   company: string;
//   phone: string;
// }

// export default class User extends Component<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       isEdit: false,
//       name: props.user.name,
//       company: props.user.company.name,
//       phone: props.user.phone,
//     };
//   }

//   toggleEdit = () => {
//     this.setState((prevState) => ({ ...prevState, isEdit: !prevState.isEdit }));
//   };

//   handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   saveUser = () => {
//     const { company, name, phone } = this.state;
//     const { editUser, user } = this.props;

//     const updatedUser = {
//       ...user,
//       name,
//       company: { name: company },
//       phone,
//     };

//     editUser(updatedUser);
//     this.toggleEdit();
//   };

//   render() {
//     return (
//       <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
//         <div className="card-body">
//           {this.state.isEdit ? (
//             <div>
//               <input
//                 className="form-control mb-2"
//                 name="name"
//                 value={this.state.name}
//                 onChange={this.handleChange}
//               />
//               <input
//                 className="form-control mb-2"
//                 name="company"
//                 value={this.state.company}
//                 onChange={this.handleChange}
//               />
//               <input
//                 className="form-control mb-2"
//                 name="phone"
//                 value={this.state.phone}
//                 onChange={this.handleChange}
//               />
//               <button onClick={this.saveUser} className="btn btn-success btn-sm me-2">
//                 Save
//               </button>
//             </div>
//           ) : (
//             <div className="d-flex align-items-center">
//               <NavLink
//                 className='className="d-flex align-items-center flex-grow-1 text-decoration-none'
//                 to={`/users/${this.props.user.id}`}
//                 onClick={() => {
//                   this.props.setChange(() => () => this.props.changeIsDetails(this.props.user));
//                   this.props.setUser(this.props.user);
//                   this.props.changeIsDetails(this.props.user);
//                 }}
//               >
//                 <div style={{ flexGrow: 1 }}>
//                   <h5 className="card-title">{this.props.user.name}</h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     {this.props.user.company.name}
//                   </h6>
//                   <p className={`card-text ${style.color}`}>
//                     {this.props.user.phone}
//                   </p>
//                 </div>
//               </NavLink>
//               <button onClick={this.toggleEdit} className="btn btn-warning btn-sm me-2">
//                 Edit
//               </button>
//               <button onClick={this.props.deleteUser} className="btn btn-danger btn-sm">
//                 Del
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
