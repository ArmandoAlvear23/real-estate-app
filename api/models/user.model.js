import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAmQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADMQAQACAQIDBAgEBwAAAAAAAAABAgMEEQUSMSFBUaETIjJSYXGxwYGR0eEUFSMzQmJy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APpIAAAAAAAAAAAAAAAAAAAAAAAAH4AOvT8PzZtpn1K+Nv0dmg0EY9smeN791fdSII/HwrDX27Xt5N38v0223o/OXUA4L8K09o9Wb1n4Tv8AVxajhubFE2ptkr8Ov5JwBVxN67Q1zxN8fq5PKfmhbRNbTW0TExO07g8AAAAAAAAAASHCdNF7znvHZXsrHjPij1j0uP0WClNtto8wbQAAAAAEZxfTb19PXrHtJNjkrF6TS3S0bSCsj29Zpe1Z61naXgAAAAAAAAM8Ec2bHE99oWVWsNuXLS091olZQAAAAAACQBX9fERrMsR727nb9dbm1eWY97ZoAAAAAAAAAWDQ5ozaalt95jsn5q+7OHar0GXlv/bv1+E+IJwI6AAAAADXqMkYcN8k/wCMNiH4rqoyX9DTtrWd7T4yCPmZmZmesgAAAAAAAAAAzw4r5rxTHWZn6A7NBxD0W2PNMzSOlvD9kxW0WrFqzvE9JcWl4djxbWy7Xv5Q7YjboD0AAmdgBFa7iEWicenn4Tb9EYnNVoMWfeYjkv4x3/NEajT5NPblyV+Vo6SDUAAAAAAAADfo9NbU5eXpSPasD3SaS+pt2b1pHW32hOYMNMFOTHXaPq9x4646VrSIisdIhmAAAAAAAxyY65KTW9YtWe6WQCC1uhtp55qetjn84ciz2rFomJ6Sg9fpP4e/NSP6Vp7PhPgDkAAAAAB7Ws3tFaxvMztCw6TBXT4a447Z758ZRfCMPPqJyT7NI800AAAAAAAAAAAwzY65cdqXjstG0swFazY5w5bY7daywSfGcPbTNEf62+yMAAAABNcIpyaXm96Zn7O5p0leTTYq+FI+jcAAAAAAAAAAAADm4hjjJpMkd8RvH4dqAWe0RaJiekqxMTEzE9YAAAABZ6+zHyegAAAAAAAAAAAAArWo7NRk/wC5+oAwAB//2Q==",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
