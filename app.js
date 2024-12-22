let modeswitch = document.getElementById("mode");
let togglemode = 1;
modeswitch.addEventListener('click', () => {
    // console.log("hello");
    if (togglemode == 1) {
        let x = document.getElementsByTagName("body")[0];
        x.classList.add("darkmode");
        togglemode = !togglemode;
        modeswitch.innerHTML = `Light <i class="fa fa-sun"></i>`;
    }
    else {
        let x = document.getElementsByTagName("body")[0];
        x.classList.remove("darkmode");
        togglemode = !togglemode;
        modeswitch.innerHTML = `Dark <i class="fa fa-moon"></i>`;

    }
})
fetchData('harsh-dagar');
function submitUN(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    fetchData(username);
}
async function fetchData(username) {
    let errormsg=document.getElementById('user-not-found');
    errormsg.classList.add('hideNotFindMsg');
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const userdata = await res.json();
        if (!res.ok) {
            errormsg.classList.remove('hideNotFindMsg');
            return console.log("ERRRRRREERFRR");
        }
        return updateUserData(userdata);
    }
    catch (err) {
        return console.log("USER NOT FOUNT!!!",err);
    }


}

function updateUserData(userData) {

    const pUserName = document.getElementById("p-username");
    // pUserName.firstElementChild.innerHTML = userData.name;
    pUserName.lastElementChild.innerHTML = `@${userData.login}`;
    if(!userData.name||userData.name.length<1){
        pUserName.firstElementChild.innerHTML =userData.login;
    }
    else{
         pUserName.firstElementChild.innerHTML = userData.name;

    }


    const joinDate = document.getElementById('p-joindate');
    const joinedAt = userData.created_at.split('T')[0];
    const datearr = joinedAt.split('-');

    const year = datearr[0];
    const month = datearr[1];
    const day = datearr[2];
    joinDate.innerHTML = `${day}-${month}-${year}`;


    const profileDP = document.getElementById('profile-dp');
    profileDP.firstElementChild.src = userData.avatar_url;


    const bio = document.getElementById('p-bio');
    if (!userData.bio || userData.bio.length < 1) {
        bio.classList.add('opacity-75');
        bio.innerHTML = `<p>This profile has no bio</p>`;
      } else {
        bio.classList.remove('opacity-75');
        bio.firstElementChild.innerText = userData.bio;
      }
    const repo = document.getElementById('repos');
    const followers = document.getElementById('followers');
    const following = document.getElementById('following');

    repo.lastElementChild.innerHTML = userData.public_repos;
    followers.lastElementChild.innerHTML = userData.followers;
    following.lastElementChild.innerHTML = userData.following;

    const userLoc = document.getElementById('p-link-ele1');
    const userTw = document.getElementById('p-link-ele2');
    const userSite = document.getElementById('p-link-ele3');
    const userorg = document.getElementById('p-link-ele4');
    if (!userData.location || userData.location.length < 1) {
        userLoc.classList.add('opacity-50');
        userLoc.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> Not Available`;
    } else {
        userLoc.classList.remove('opacity-50');
        userLoc.innerHTML=`<i class="fa fa-map-marker" aria-hidden="true"></i> ${userData.location}`;
    }

    if (!userData.twitter_username || userData.twitter_username.length < 1) {
        userTw.classList.add('opacity-50');
        userTw.firstElementChild.innerHTML = `<i class="fa fa-twitter"></i> Not Available`;
        userTw.firstElementChild.removeAttribute('href');
    } else {
        userTw.classList.remove('opacity-50');
        userTw.firstElementChild.innerHTML  = `<i class="fa fa-twitter"></i> @${userData.twitter_username}`;
        userTw.firstElementChild.href = `https://twitter.com/${userData.twitter_username}`;
    }

    if (!userData.blog || userData.blog.length < 1) {
        userSite.classList.add('opacity-50');
        userSite.firstElementChild.innerHTML = `<i class="fa fa-link"></i>  Not Available`;
        userSite.firstElementChild.removeAttribute('href');
    } else {
        const userWebsiteShort = userData.blog.split('/')[2];

        userSite.classList.remove('opacity-50');
        userSite.firstElementChild.innerHTML = `<i class="fa fa-link"></i> ${userWebsiteShort}`;
        userSite.firstElementChild.href = userData.blog;
    }

    if (!userData.company || userData.company.length < 1) {
        userorg.classList.add('opacity-50');
        userorg.firstElementChild.innerHTML = `<i class="fa fa-solid fa-building"></i>  Not Available`;
        userorg.firstElementChild.removeAttribute('href');
    } else {
        const userOrganizationWithoutAt = userData.company.split('@')[1];

        userorg.classList.remove('opacity-50');
        userorg.firstElementChild.innerHTML = `<i class="fa fa-solid fa-building"></i> ${userData.company}`;
        userorg.firstElementChild.href = `https://github.com/${userOrganizationWithoutAt}`;
    }

}
