import React from 'react';
import logo from '../../images/logo.png'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Header = () => {



    return (
        <div className="w-full bg-red-900 h-24 bg-contain">
            <nav class="flex  fixed  top-0 items-center justify-between bg-teal pt-3 px-3 w-full">
                <div class="flex items-center flex-no-shrink text-white mr-6">
                    <img src={logo} className="object-contain h-20"></img>
                </div>

                <div class="w-full block flex-grow grid justify-items-stretch">
                    <div className="justify-self-end">

                        {/* //////////////////////////// FAVORITES //////////////////////////// */}
                        <button className="inline-block text-sm px-4 rounded text-white mt-4 font-bold block text-center focus:outline-none">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span>
                                <span className="text-xs">FAVORITES</span>
                            </span>
                        </button>
                        {/* /////////////////////////////////////////////////////////////// */}

                        {/* //////////////////////////// ACCOUNT //////////////////////////// */}



                        <Menu as="div" className="relative inline-block text-left">
                            {({ open }) => (
                                <>
                                    <div>
                                        <Menu.Button className="inline-block text-sm pl-4 mr-10 rounded text-white mt-6 font-bold block text-center focus:outline-none">
                                            <div className="flex">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 self-end" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <span>
                                                <span className="text-xs">ACCOUNT</span>
                                            </span>
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items static className="origin-top-right absolute right-0 mt-2 w-56 mr-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Sign up
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Login
                                                        </a>
                                                    )}
                                                </Menu.Item>

                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                        {/* /////////////////////////////////////////////////////////////// */}
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Header;