import React, { useContext, useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Tooltip,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, Cog6ToothIcon, InboxArrowDownIcon, LifebuoyIcon, PowerIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { MdPostAdd } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SiManageiq } from "react-icons/si";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import Swal from "sweetalert2";

export default function StickyNavbar() {
    const { user } = useContext(AuthContext);
    const handleLogOut = () => {
        signOut(auth)
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Awesome",
                    text: "Logged Out",
                  });
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Ops!!!",
                    text: `${error.message}`,
                  });
            });
    }
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/" className="flex items-center">
                    Home
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/needvolunteer" className="flex items-center">
                    Need Volunteer
                </NavLink>
            </Typography>
        </ul>
    );

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    const profileMenuItems = [
        {
            label: <NavLink to="/addvolunteerpost">Add Volunteer post</NavLink>,
            icon: IoMdAddCircleOutline,
        },
        {
            label: <NavLink to="/managemypost">Manage My post</NavLink>,
            icon: SiManageiq,
        },
        {
            label: <NavLink to="/myvolunteerrequest">My Volunteer requested post</NavLink>,
            icon: VscGitPullRequestGoToChanges,
        },
    ];

    const [theme,setTheme] = useState("light");

    
    useEffect(()=>{
        localStorage.setItem('theme',theme)
        const storedTheme = localStorage.getItem("theme");
        document.querySelector('html').setAttribute('data-theme',storedTheme)
    },[theme])
    
    const handleTheme = ()=>{
        theme == "light" ? setTheme(" dark") : setTheme("light")
    }
    return (
        <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to="/"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    <div className=" font-bold md:text-2xl lg:text-3xl text-center">
                        <span className="text-blue-500">Giving</span><span className="text-green-500">Globe</span>
                    </div>

                </Link>
                <div className="flex items-center gap-3 md:gap-10">
                    <div className="mx-auto hidden lg:block">{navList}</div>
                    <div className="flex items-center gap-x-1 ">
                    <label className="swap swap-rotate m-0 p-0">
                            <input onChange={()=>handleTheme()} type="checkbox" className="theme-controller" value="synthwave" />
                            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                        </label>
                        {
                            user ? <Button onClick={handleLogOut} variant="danger" size="sm" className="hidden lg:inline-block"> <Link to="/login">Log Out</Link>
                            </Button>
                                :
                                <>
                                    <Button
                                        variant="text"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                    <Button
                                        variant="gradient"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                    >
                                        <Link to="/register">Sign in</Link>
                                    </Button>
                                </>
                        }
                    </div>
                    {
                        user &&
                        <>
                            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                                <MenuHandler>
                                    <Button
                                        variant="text"
                                        color="blue-gray"
                                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                                    >
                                        <Tooltip content={`${user?.displayName}`} placement="bottom-end" animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 0 },
                                        }}>
                                            <Avatar
                                                variant="circular"
                                                size="sm"
                                                alt="tania andrew"
                                                className="border border-gray-900 p-0.5"
                                                src={`${user?.photoURL}`}
                                            />
                                        </Tooltip>
                                        <ChevronDownIcon
                                            strokeWidth={2.5}
                                            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </Button>
                                </MenuHandler>
                                <MenuList className="p-1">
                                    {profileMenuItems.map(({ label, icon }, key) => {
                                        return (
                                            <MenuItem
                                                key={label}
                                                onClick={closeMenu}
                                                className="flex items-center gap-2 rounded"
                                            >
                                                {React.createElement(icon, {
                                                    className: `h-4 w-4`,
                                                    strokeWidth: 2,
                                                })}
                                                <Typography
                                                    as="span"
                                                    variant="small"
                                                    className="font-normal"
                                                    color="inherit"
                                                >
                                                    {label}
                                                </Typography>
                                            </MenuItem>
                                        );
                                    })}
                                </MenuList>
                            </Menu>
                        </>
                    }
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <MobileNav open={openNav}>
                {navList}
                <div className="flex items-center gap-x-1">
                    {
                        user ? <Button onClick={handleLogOut} fullWidth variant="danger" size="sm"> <Link to="/login">Log Out</Link></Button>
                            :
                            <>
                                <Button fullWidth variant="text" size="sm" className="">
                                    <Link to="/login">Log In</Link>
                                </Button>
                                <Button fullWidth variant="gradient" size="sm" className="">
                                    <Link to="/register" >Sign in</Link>
                                </Button>
                            </>
                    }
                </div>
            </MobileNav>
        </Navbar>

    );
}