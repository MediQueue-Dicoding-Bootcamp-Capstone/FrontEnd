export const formatTime = (time) => {
    return time.substr(0, 5);
  };

  export const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  export const formatDateToBackend = (datestring) => {
    const date = new Date(datestring);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based so add 1 and format to 2 digits
    const day = ("0" + date.getDate()).slice(-2); // Format to 2 digits
  
    return `${year}-${month}-${day}`;
  }
  