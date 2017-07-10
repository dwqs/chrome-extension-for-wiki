/**
 * Created by pomy on 10/07/2017.
 */

export const repoExist = (repo, repos) => {
    if (!repos.length) {
        return false;
    }

    const reposName = [];

    repos.forEach(function (item) {
        reposName.push(item.name);
    });

    return reposName.includes(repo);
};
