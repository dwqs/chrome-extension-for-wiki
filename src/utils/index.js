/**
 * Created by pomy on 10/07/2017.
 */

export let repoExist = (repo, repos) =>{
    if(!repos.length){
        return false;
    }

    let reposName = [];

    repos.forEach(function (item) {
        reposName.push(item.name);
    });

    return reposName.includes(repo);
};
