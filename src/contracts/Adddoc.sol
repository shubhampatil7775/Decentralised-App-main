pragma solidity >=0.4.22 <0.8.0;


contract Adddoc {

    string bonafidehai;

    struct Studoc{
        string docname;
        string date;
        string dochash;
    }

     struct UserInfo{
        string FullName;
        string EmailID;
        string MobileNo;
    }

    struct Request{
        string stuname;
        uint bonafide;
        uint scholor;
        uint academics;
        uint status;
    }

   
    struct Bonafidekastruct{
        string bonafidekistring;
    }

    struct Scholorkastruct{
        string scholorkistring;
    }
    struct Academicskastruct{
        string academicskistring;
    }

    mapping(address => Studoc[]) Stumap;
    mapping(address => UserInfo[]) UserMap;
    mapping(address => Request[]) RequestMap;

    mapping(address => Bonafidekastruct[]) Bonamap;
    mapping(address => Scholorkastruct[]) Scholmap;
    mapping(address => Academicskastruct[]) Acamap;

    function set(string memory _memeHash) public {
        bonafidehai = _memeHash;
    }

    function get() public view returns (string memory) {
        return bonafidehai;
    }

    function setstudoc(address UserAddress,string memory _docname,string memory _date,string memory _dochash) public {
        Stumap[UserAddress].push(Studoc(_docname,_date,_dochash));
    }

    function getstudoc(address UserAddress,uint UserIndex) view public returns(string memory,string memory,string memory) {
        Studoc memory ThisUser=Stumap[UserAddress][UserIndex];
        return(ThisUser.docname,ThisUser.date,ThisUser.dochash);

    }


    function AddUser(address UserAddress,string memory FullName,string memory EmailID,string memory MobileNo) public
    {
        UserMap[UserAddress].push(UserInfo(FullName,EmailID,MobileNo));
    }

    
    function getUser(address ins,uint UserIndex) view public returns (string memory, string memory, string memory) {
        UserInfo memory ThisUser=UserMap[ins][UserIndex];
        return (ThisUser.FullName, ThisUser.EmailID, ThisUser.MobileNo);
    }





    function AddBonafidecertificate(address UserAddress,string memory _bonafide) public 
    {
        Bonamap[UserAddress].push(Bonafidekastruct(_bonafide));
    }

     function AddScholorcertificate(address UserAddress,string memory _scholor) public 
    {
        Scholmap[UserAddress].push(Scholorkastruct(_scholor));
    }

     function AddAcademicscertificate(address UserAddress,string memory _academics) public 
    {
        Acamap[UserAddress].push(Academicskastruct(_academics));
    }
    
    function viewDoc(address UserAddress,uint RequestIndex) public view returns(uint,string memory,uint,string memory,uint,string memory)
    {
        Bonafidekastruct memory ThisBona=Bonamap[UserAddress][0];
        Scholorkastruct memory ThisSchol=Scholmap[UserAddress][0];
        Academicskastruct memory ThisAca=Acamap[UserAddress][0];
        Request memory ThisRequest=RequestMap[UserAddress][RequestIndex];
        return (ThisRequest.bonafide,ThisBona.bonafidekistring,ThisRequest.scholor,ThisSchol.scholorkistring,ThisRequest.academics,ThisAca.academicskistring);
    }

    function viewDocLength(address UserAddress) view public returns(uint)
    {
        return Stumap[UserAddress].length;
    }

    

    


    function AddRequest(address UserAddress,string memory stuname,uint bonafide,uint scholor,uint academics,uint status) public
    {
        RequestMap[UserAddress].push(Request(stuname,bonafide,scholor,academics,status));
    }
    
    function ViewRequestLength(address UserAddress) view public returns(uint)
    {
        return RequestMap[UserAddress].length;
    }
    
    function ViewRequestHeader(address UserAddress, uint RequestIndex) view public returns(string memory stuname, uint status)
    {
        Request memory ThisRequest=RequestMap[UserAddress][RequestIndex];
        return (ThisRequest.stuname, ThisRequest.status);
    }

    function ViewRequestDetail(address UserAddress, uint RequestIndex) view public returns(string memory stuname,uint bonafide,uint scholor,uint academics,uint status)
    {
        Request memory ThisRequest=RequestMap[UserAddress][RequestIndex];
        return (ThisRequest.stuname, ThisRequest.bonafide, ThisRequest.scholor, ThisRequest.academics,ThisRequest.status);
    }

    function UpdateRequestStatus(address UserAddress, uint RequestIndex, uint bonafide,uint scholor,uint academics,uint status) public
    {
        RequestMap[UserAddress][RequestIndex].bonafide=bonafide;
        RequestMap[UserAddress][RequestIndex].scholor=scholor;
        RequestMap[UserAddress][RequestIndex].academics=academics;
        RequestMap[UserAddress][RequestIndex].status=status;
    }
   
}
                                        
