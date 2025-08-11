export const getNavbarClasses = (isHomePage = false, scrolled = false) => {
    if (isHomePage) {
      return `${scrolled ? "xl:relative fixed top-0 left-0" : "relative"} w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-teal-100"
          : "bg-transparent xl:bg-transparent bg-white"
      }`
    }
    return `fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-lg border-b border-teal-100`
  }
  
  export const getTextClasses = (isHomePage = false, scrolled = false) => {
    if (!isHomePage || scrolled) {
      return "text-teal-700 hover:text-teal-600"
    }
    return "text-gray-800 hover:text-teal-700 drop-shadow-lg"
  }
  
  export const getUnderlineClasses = (isHomePage = false, scrolled = false) => {
    if (!isHomePage || scrolled) {
      return "bg-gradient-to-r from-teal-400 to-teal-300"
    }
    return "bg-gradient-to-r from-gray-800 to-teal-700"
  }
  
  export const getMobileTextClasses = (isHomePage = false, scrolled = false) => {
    if (!isHomePage || scrolled) {
      return "text-teal-700 hover:text-teal-600 hover:bg-teal-50"
    }
    return "text-gray-800 hover:text-teal-700 hover:bg-gray-100/50"
  }
  
  export const getMobileBorderClasses = (isHomePage = false, scrolled = false) => {
    if (!isHomePage || scrolled) {
      return "border-teal-100"
    }
    return "border-gray-300/50"
  }
  
  export const getMobileSubTextClasses = (isHomePage = false, scrolled = false) => {
    if (!isHomePage || scrolled) {
      return "text-teal-600 hover:text-teal-500 hover:bg-teal-50"
    }
    return "text-gray-600 hover:text-teal-700 hover:bg-gray-100/50"
  }
  