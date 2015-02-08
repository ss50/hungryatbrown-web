#Only find events for students - do t from pulling from only any undergraduate
import urllib2
import re
def findEntries():

    data = urllib2.urlopen("http://morningmail.brown.edu/xml.php?feed=all&days=")
    #data = urllib2.urlopen("http://events.brown.edu/cal/main/showEventList.rdo")

    lines = []
    for lineInData in data:
        lines.append(lineInData.split())

    entries = []
    entry = []
    for line in lines:
        entry.append(line)
        if line == ['</item>']: #find all distinct items
            entries.append(entry)
            entry = []

    ww = getWordsAndWeights()

    scores = []
    for i in xrange(1, len(entries)):
        score = 0
        currHash = hashEntry(entries[i][6]) #the 6th element of the ith entry in entries contains the description
        for goodWord in ww:
            if goodWord in currHash:
                score = score + ww[goodWord] #this scores a word based on its unique appearance in the description
        scores.append(score)

    #print(scores)
    results = []
    for j in xrange(len(scores)):
        if scores[j] > 2:
            results.append(entries[j+1])
    return results



#Takes in an entry, and returns a hashtable containing the word count of different words contained in that entry
#Hash bigrams also! "free food" "nice slice" etc, remember that they will be case sensitive
def hashEntry(entry):
    wordCount = {}
    listOfWords = []
    for word in entry:

        newWord = word.strip("[,!?.]")
        listOfWords.append(newWord)

    for i in xrange(len(listOfWords)):

        x = listOfWords[i].strip("[,!?.]()<>")

        #hash all single words
        if x in wordCount:
            wordCount[x] = wordCount[x] + 1
        else:
            wordCount[x] = 1

        #hash all ordered pairs of words
        if i < (len(listOfWords) - 1):
            doubleWord = listOfWords[i].strip("[,!?.]()<>") + " " + listOfWords[i+1].strip("[,!?.]()<>")
            if doubleWord in wordCount:
                wordCount[doubleWord] = wordCount[doubleWord] + 1
            else:
                wordCount[doubleWord] = 1
    return wordCount

def getWordsAndWeights():
    ww = {
               "free food": 4,
               "free lunch": 4,
               "free dinner": 4,
               "nice slice": 2,
               "Nice Slice": 2,
               "chipotle":3,
               "Chipotle":3,
               "be served": 1,
               "kabob": 1,
               "free":1 ,
               "food": 2,
               "snacks": 2,
               "dessert":2,
               "desserts":2,
               "pizza":3,
               "pancakes":1,
               "baked":1,
               "goods":0.5,
               "cupcakes":1,
               "ratty":-10,
               "refreshments": 1,
               "popcorn":1,
               "cider":1,
               "candy":1,
               "served":1,
               "cheese":3,
               "Sharpe Refectory": -10,
               "tea": 4,
            }
    return ww
#pulls from brown events website. This allows retrieval of event titles nad locations of free food events.
def parseEvents(res):
    data = urllib2.urlopen("http://events.brown.edu/cal/main/showMain.rdo")
    dict = {}
    evttitles = []
    for linedata in data:
        #split linedata on two delimiters
        result = re.search("location=(.*)>",linedata)
        titlesearch = re.search("text=(.*)>",linedata)
        #timesearch = re.search("PM",linedata);
        #if(timesearch is not None):
            #print(timesearch.group(1))
        #extract location
        #print("LINE SEPARATOR")
        #print(timesearch)
        if(titlesearch is not None):
            if(result is not None):
                #print(len(timesearch))
                locationsearchres = result.group(0)
                titlesearchres = titlesearch.group(0)
                titlefinal = re.split("text=",titlesearchres)[1].split("&amp")[0].strip()
                #location extraction
                titlesearchres2 = re.split(">",locationsearchres)[0]
                locationfinal = titlesearchres2.replace("location=","").replace('"','')
                dict[titlefinal] = locationfinal
                evttitles.append(titlefinal)
    #insert final titles/locations into array of results
    parsedtitles = []
    finalresults = []
    #print(len(evttitles))
    #print(dict)
    for entry in findres:
        temp = entry[5]
        builtstring = ""
        for stuff in temp:
            builtstring = builtstring+ " "+stuff.replace('<title><![CDATA[','').replace(']]></title>','').replace('(','').replace(')','')
        if(builtstring.strip() not in parsedtitles):
            parsedtitles.append(builtstring.strip())
    for title in parsedtitles:
        #if dict contains title
        #print(title)
        if(dict.has_key(title)):
            finalresults.append(title)
        else:
            for b in evttitles:
                #print(b)
                #print(title)
                if(match(title,b)):
                    finalresults.add(b)        
    #print(len(finalresults))
    finaldict = {}
    for finalt in finalresults:
        finaldict[finalt] = dict.get(finalt)
    #print(finaldict)
    return finaldict
    #return evttitles
def match(a, b):
    #print(a)
    #print(b)
    alength = len(a)/2
    score = 0
    aparts = a.split(" ")
    for part in aparts:
        #print(part)
        if(re.search(part,b) is not None):
            score+1
    #print(score)
    if(score>alength):
        return True
    else:
        return False
if __name__=="__main__":
    findres = findEntries()
    parseEvents(findres)
