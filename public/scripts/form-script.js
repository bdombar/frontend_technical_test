let username = '';
const searchBtn = document.getElementById('searchRepos');
const divRepos = document.getElementById('divRepos');
searchBtn.addEventListener('click', getUser);

async function getUser() {
    divRepos.innerHTML = '';
    username = document.getElementById('username').value;
    if (username === '') {
        const p = document.createElement('p');
        p.textContent = "Please enter a username";
        divRepos.appendChild(p);
    } else {
        const URL_NAME = `https://api.github.com/users/${username}`;
        try {
            const response = await fetch(URL_NAME);
            if (response.status === 404) {
                divRepos.innerHTML = 'We could not find the username you provided. Try again.';
            }
            if (response.status === 200) {
                getUserRepos();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

async function getUserRepos() {
    const URL_REPOS = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(URL_REPOS);
        const result = await response.json();
        if (result.length === 0) {
            const p = document.createElement('p');
            p.textContent = "This user has no repositories";
            divRepos.appendChild(p);
        } else {
            result.forEach(element => {
                const anchor = document.createElement('a');
                anchor.href = element.html_url;
                anchor.textContent = element.url;
                divRepos.appendChild(anchor);
                divRepos.appendChild(document.createElement('br'));
                divRepos.appendChild(document.createElement('br'));
            });
        }
    }
    catch (error) {
        const p = document.createElement('p');
        p.textContent = "Error";
        divRepos.appendChild(p);
        console.log(error);
    }


}