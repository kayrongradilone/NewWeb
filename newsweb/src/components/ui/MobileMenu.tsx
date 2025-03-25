"use client"
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { Button } from './button';

const MobileMenu = () => {
    const [isMobileMenuOpen, setIsmobileMenuOpen] = useState(false);
    const toogleMobileMenu = () => {
      setIsmobileMenuOpen(!isMobileMenuOpen);
    };
  return (
    
      <div className="lg:hidden">
          <Button onClick={toogleMobileMenu}>
            {isMobileMenuOpen ? <AiTwotoneCloseCircle size={24}/> : <RxHamburgerMenu size={24} />}
          </Button>
        </div>
      
    
  )
}

export default MobileMenu
