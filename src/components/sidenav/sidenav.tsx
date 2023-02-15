import Image from "next/image";
import Link from "next/link";
import {jc} from "@/helpers/general_helper";
import classes from "./sidenav.module.css";
import sidenav_data from "./sidenav.data.json"

export default function SideNav() {
    // TODO: make this dynamic

    const current_path = "/"

    return <aside className={jc("bg-black flex-shrink-0 text-white", classes.aside)}>
        <div className="p-3">
            <Image src={"/assets/logo.svg"} alt={"Logo"} width={147} height={16}/>
        </div>
        <div className="p-3 d-flex align-items-center">
            <div className={"bg-secondary rounded-circle py-2 me-3"} style={{
                width: "45px",
                height: "45px",
            }}/>
            <div className={"lh-1"}>
                <p className="fw-bold mb-1">
                    Postcard Admin
                </p>
                <small>Admin</small>
            </div>
        </div>
        {sidenav_data.map((sidenav_group, index) => {
            return <div key={index} className={classes['nav-group']}>
                {sidenav_group.map((sidenav_item, sidenav_item_index) => {
                    const is_active = current_path === sidenav_item.href;
                    return <Link href={sidenav_item.href} key={sidenav_item_index}
                                 className={jc(classes['nav-item'], is_active ? classes['active'] : "")}>
                        <div className="p-3 d-flex align-items-center">
                            {sidenav_item.icon.type === 'image' &&
                                <div className={jc(classes['nav-icon'], 'me-3')}>
                                    <Image
                                        src={is_active ? sidenav_item.icon.value.active : sidenav_item.icon.value.default}
                                        alt={"icon image"}
                                        width={27} height={27}/>
                                </div>
                            }
                            {sidenav_item.title}
                        </div>
                    </Link>
                })}
            </div>
        })}
    </aside>
}
