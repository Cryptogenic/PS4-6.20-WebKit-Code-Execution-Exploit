/*
 * PS4 WebKit Exploit 6.20
 * By Specter (@SpecterDev)
 * -
 * This file contains an (incomplete) list of system calls for post-exploit stuff. A lot
 * of syscalls are missing so feel free to add ones you need. I didn't include a more complete
 * list like I have with previous firmwares because having too many seemed to affect exploit
 * stability.
 */

window.nameforsyscall = swapkeyval(window.syscallnames);

function swapkeyval(json){
    var ret = {};

    for(var key in json){
        if (json.hasOwnProperty(key)) {
            ret[json[key]] = key;
        }
    }

    return ret;
}

/* A long ass map of system call names -> number, you shouldn't need to touch this */
window.syscallnames =
{
    "sys_exit": 1,
    "sys_fork": 2,
    "sys_read": 3,
    "sys_write": 4,
    "sys_open": 5,
    "sys_close": 6,
    "sys_wait4": 7,
    "sys_unlink": 10,
    "sys_chdir": 12,
    "sys_chmod": 15,
    "sys_getpid": 20,
    "sys_setuid": 23,
    "sys_getuid": 24,

    "sys_stat": 38,

    "sys_pipe": 42,

    "sys_getgid": 47,
    "sys_getlogin": 49,
    "sys_setlogin": 50,

    "sys_ioctl": 54,

    "sys_munmap": 73,

    "sys_socket": 97,
    "sys_connect": 98,

    "sys_send": 101,
    "sys_recv": 102,
    "sys_bind": 104,
    "sys_setsockopt": 105,
    "sys_listen": 106,
    "sys_recvmsg": 113,
    "sys_sendmsg": 114,

    "sys_mkdir": 136,
    "sys_rmdir": 137,

    "sys_fstat": 189,
    "sys_lstat": 190,

    "sys_getdents": 272,

    "sys_mmap": 477,
    "sys_lseek": 478,
};
