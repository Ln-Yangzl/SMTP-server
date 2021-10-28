

export default function SideBar(props) {


    return (
        <div className="left-side sticky-left-side">

            <div className="logo">
                <a href="index.html"><img src="images/logo.png" alt="" /></a>
            </div>



            <div className="left-side-inner">

                <ul className="nav nav-pills nav-stacked custom-nav">

                    <li><a href="/#"> <span>写信件</span></a></li>
                    <li><a href="/#"> <span>发件箱</span></a></li>
                    <li><a href="/#"> <span>草稿箱</span></a></li>

                </ul>

            </div>
        </div>

    );

}