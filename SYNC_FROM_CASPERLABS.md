To sync with the Casperlabs` Clarity repository do the following:
```
git fetch casperlabs 
git checkout master
git checkout -b test-merge-branch
git merge casperlabs/master
```

If everything goes well you can later merge the ```test-merge-branch``` into ```master```.
