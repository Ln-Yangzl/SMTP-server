

export default function SideBar(props) {


    return (
        <div class="left-side sticky-left-side">

            <div class="logo">
                <a href="index.html"><img src="images/logo.png" alt="" /></a>
            </div>



            <div class="left-side-inner">

                <ul class="nav nav-pills nav-stacked custom-nav">

                    <li><a href="/#"> <span>写信件</span></a></li>
                    <li><a href="/#"> <span>收件箱</span></a></li>
                    <li><a href="/#"> <span>草稿箱</span></a></li>

                </ul>

            </div>
        </div>

    );

}